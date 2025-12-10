from argon2 import PasswordHasher, Type

hasher = PasswordHasher(type=Type.ID)

def hash_password(password: str) -> str:
    """Return an Argon2id hash for the given password."""
    return hasher.hash(password)

