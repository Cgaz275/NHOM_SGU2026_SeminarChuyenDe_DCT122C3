import os
from openai import OpenAI


os.environ["OPENAI_API_KEY"] = "sk-project-xxxx"  # Thay bằng API key của bạn

if __name__ == '__main__':
    client = OpenAI()
    
    # Model ID của bạn đã được cấu hình sẵn:
    my_fine_tuned_model = "ft:gpt-4o-mini-2024-07-18:anthony::DKg0IIHJ" 

    print("Đang yêu cầu mô hình mới viết code giải phương trình...")
    completion = client.chat.completions.create(
        model=my_fine_tuned_model,
        messages=[
            {"role": "system", "content": "You will be provided with a Python function signature enclosed with {{{ FUNCTION }}}. Your task is to implement it."},
            # Dùng cùng đề bài phương trình bậc 2 để so sánh với 2.3.1
            {"role": "user", "content": "FUNCTION: {{{def compute_quadratic_roots(a, b, c):}}}\n CODE: "},
        ]
    )
    
    print("\n=== KẾT QUẢ ĐẦU RA TỪ MÔ HÌNH ĐÃ TINH CHỈNH ===")
    print(completion.choices[0].message.content)