import subprocess
import sys


def run(command: list[str]) -> None:
    print(f"\n>>> Running: {' '.join(command)}")
    result = subprocess.run(command)
    if result.returncode != 0:
        sys.exit(result.returncode)


def main() -> None:
    run(["uv", "run", "ruff", "format", "."])
    run(["uv", "run", "ruff", "check", "--fix", "."])
    run(["uv", "run", "pytest"])


if __name__ == "__main__":
    main()
