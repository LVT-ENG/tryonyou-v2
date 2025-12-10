import argparse
import json
from pathlib import Path


def list_module_names(json_path: Path) -> list[str]:
    """Return a list of module ids from the given config file."""
    with json_path.open(encoding="utf-8") as f:
        data = json.load(f)
    modules = data.get("modules", [])
    return [module.get("id", "") for module in modules]


def main() -> None:
    parser = argparse.ArgumentParser(description="Print module names from config JSON")
    parser.add_argument("config", type=Path, help="Path to configuration JSON file")
    args = parser.parse_args()

    names = list_module_names(args.config)
    for name in names:
        print(name)


if __name__ == "__main__":
    main()
