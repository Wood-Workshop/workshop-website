import subprocess
import sys


def run(command: list[str]) -> None:
    print(f"\n>>>Running: {' '.join(command)}")
    result = subprocess.run(command)
    if result.returncode != 0:
        sys.exit(f"\n>>>Error: {result.returncode}")


def main() -> None:
    run(["uv", "run", "ruff", "check", "."])
    run(["uv", "run", "ruff", "format", "--check", "."])
    run(["uv", "run", "pytest"])


if __name__ == "__main__":
    main()
