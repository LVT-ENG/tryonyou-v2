import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from scripts.password_utils import hash_password


def test_hash_password_format():
    hashed = hash_password("Tryon@2024!")
    assert hashed.startswith("$argon2id$"), hashed
