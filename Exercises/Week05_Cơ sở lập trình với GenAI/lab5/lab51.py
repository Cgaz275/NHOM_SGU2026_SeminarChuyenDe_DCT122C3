import inspect

SURROUND = """
You are a senior Python developer and technical writer.
You will be provide with a Python function enclosed with {{{ Function }}}.
You write high quality Python documentation and follow best practices for writing clear and structured docstrings.
"""

SINGLE_TASK = """
Generate a Python docstring for the provided function.

The docstring should include:
- A short description of the function
- Args section describing parameters
- Returns section describing the output

Use Google style docstrings.
"""


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


def get_user_prompt(func: callable) -> str:
    return f"""
FUNCTION: {{{{{{ {inspect.getsource(func)} }}}}}}

GOOGLE STYLE DOCSTRING:
"""


if __name__ == "__main__":
    from openai import OpenAI
    from openai.types.chat import ChatCompletion

    client: OpenAI = OpenAI()

    completion: ChatCompletion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "system", "content": f"{SURROUND} {SINGLE_TASK}"},
                        {"role": "user", "content": get_user_prompt(Singleton.__call__)},],
    )
    print("Docstring:", completion.choices[0].message.content)
