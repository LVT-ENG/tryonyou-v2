from password_utils import hash_password

if __name__ == "__main__":
    secret = "Tryon@2024!"
    hashed = hash_password(secret)
    print(hashed)
