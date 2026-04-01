import os
from openai import OpenAI

# 1. Dán API Key của bạn vào giữa 2 dấu ngoặc kép bên dưới
os.environ["OPENAI_API_KEY"] = "sk-proj-ect-xxxx"  # Thay bằng API key của bạn

model = "gpt-4o-mini-2024-07-18"

if __name__ == '__main__':
    client = OpenAI()

    print("1. Đang tải file fine_tuning.jsonl lên máy chủ OpenAI...")
    upload_request = client.files.create(
        file=open("fine_tuning.jsonl", "rb"),
        purpose="fine-tune"
    )
    file_id = upload_request.id
    print(f"-> THÀNH CÔNG! File ID của bạn là: {file_id}")

    print("\n2. Đang khởi tạo tiến trình Fine-tuning (Huấn luyện mô hình)...")
    job = client.fine_tuning.jobs.create(
        training_file=file_id,
        model=model
    )
    print(f"-> THÀNH CÔNG! Job ID của bạn là: {job.id}")
    print("\nVUI LÒNG LÊN WEB OPENAI ĐỂ THEO DÕI TIẾN TRÌNH HUẤN LUYỆN (Khoảng 15-30 phút)")







    