import os
import sys
from collections import defaultdict


def find_duplicates(dirs):
    file_map = defaultdict(list)
    for directory in dirs:
        for root, _, files in os.walk(directory):
            for name in files:
                file_map[name].append(os.path.join(root, name))
    return {name: paths for name, paths in file_map.items() if len(paths) > 1}


if __name__ == "__main__":
    roots = sys.argv[1:] or ["."]
    duplicates = find_duplicates(roots)
    if not duplicates:
        print("No duplicate file names found.")
    else:
        for name, paths in duplicates.items():
            print(name)
            for p in paths:
                print("  ", p)
        print(f"Found {len(duplicates)} duplicate file names.")
