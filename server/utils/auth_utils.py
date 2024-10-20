from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Dict
from fastapi import HTTPException

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT configuration
SECRET_KEY = "your-secret-key-here"  # Change this to a secure secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def create_jwt_token(email: str) -> str:
    """Create a JWT token with user's email"""
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {
        "email": email,
        "exp": expire
    }
    try:
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
    except JWTError:
        raise HTTPException(status_code=500, detail="Could not create token")

def decode_jwt_token(token: str) -> Dict:
    """Decode and verify a JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if datetime.fromtimestamp(payload['exp']) < datetime.utcnow():
            raise HTTPException(status_code=401, detail="Token has expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    
