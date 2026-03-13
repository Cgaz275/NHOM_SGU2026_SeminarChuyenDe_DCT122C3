# Hàm tính trung bình nhân của 2 số nguyên
def get_geometric_mean_of_two_numbers(
        a: float, b:float,
) -> float:
    return (a * b) ** 0.5

num1: float = 5.0
num2: float = 20.0
print(get_geometric_mean_of_two_numbers(num1, num2))