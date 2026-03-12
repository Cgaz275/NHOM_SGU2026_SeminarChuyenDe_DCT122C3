import inspect

from openai import OpenAI
from openai.types.chat import ChatCompletion

SURROUND = """
You are a senior Python developer and code reviewer.

Your job is to analyze Python functions and help developers improve them.
You should identify logical bugs, incorrect assumptions, inefficiencies,
and suggest better implementations following Python best practices.

When reviewing code:
- explain what is wrong
- explain why it is wrong
- propose a corrected or improved version
- keep explanations concise and technical
"""
SINGLE_TASK = """
Analyze the given Python function.

Tasks:
1. Identify any logical bugs or incorrect assumptions.
2. Point out inefficient or non-pythonic code patterns.
3. Suggest improvements for readability and maintainability.
4. Provide a corrected or optimized version of the function.

Return the explanation first, then the improved code.
"""

def get_user_prompt(func: callable, change: str) -> str:
    source = inspect.getsource(func)
    return f"""
{SURROUND}

TASK:
{SINGLE_TASK}

CODE:
{source}

CHANGE REQUEST:
{change}
"""


def get_estimated_user_costs(prompts_data):
    costs = {}

    for entry in prompts_data:
        user = entry["user"]
        prompt = entry["prompt"]
        estimated_tokens = len(prompt) / 4  # 4 is the average number of tokens per character
        cost = estimated_tokens * 0.0001  # 0.0001 is the cost per token

        if user not in costs:
            costs[user] = cost
        else:
            costs[user] += cost

    return costs


if __name__ == "__main__":
    client: OpenAI = OpenAI()

    changes = ["Debug the function and identify any logical errors."]

    for c in changes:
        user_prompt = get_user_prompt(get_estimated_user_costs, c)

        completion: ChatCompletion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "system", "content": SURROUND},
                        {"role": "user", "content": user_prompt},],
            temperature=0.2,
        )

        print(f"Change: {c}")
        print(completion.choices[0].message.content)
