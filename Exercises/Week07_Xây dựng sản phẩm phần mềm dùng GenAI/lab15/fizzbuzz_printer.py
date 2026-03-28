import logging


logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s %(levelname)s %(message)s",
                    filename="fizzbuzz.log",
                    datefmt="%Y-%m-%d %H:%M:%S")


logger = logging.getLogger(__name__)



FIZZBUZZ_COUNTER = 0


def log_function_args(func):
    def wrapper(*args, **kwargs):
        logger.info(f"Function {func.__name__} called with args: {args}, kwargs: {kwargs}")
        return func(*args, **kwargs)

    return wrapper


def increment_counter(func):
    def wrapper(*args, **kwargs):
        global FIZZBUZZ_COUNTER
        FIZZBUZZ_COUNTER += 1
        logger.info(f"Function {func.__name__} called {FIZZBUZZ_COUNTER} times")
        return func(*args, **kwargs)

    return wrapper


def validate_args_types_and_limits(min_value, max_value):
    def decorator(func):
        def wrapper(*args, **kwargs):
            if not args:
                logger.error("No arguments provided")
                raise ValueError("No arguments provided")

            limit = args[0]

            if not isinstance(limit, int):
                logger.error(f"Invalid argument type: {limit} (type: {type(limit)})")
                raise TypeError(f"Argument must be an integer, got {type(limit)}")

            if not (min_value <= limit <= max_value):
                logger.error(f"Argument out of bounds: {limit} (must be between {min_value} and {max_value})")
                raise ValueError(f"Argument must be between {min_value} and {max_value}, got {limit}")

            return func(*args, **kwargs)

        return wrapper

    return decorator


@validate_args_types_and_limits(0, 500)
@log_function_args
@increment_counter
def print_fizzbuzz(limit: int) -> None:
    for i in range(1, limit + 1):
        if i % 3 == 0 and i % 5 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)


print_fizzbuzz(5)
print_fizzbuzz(500)
print_fizzbuzz("abc")

