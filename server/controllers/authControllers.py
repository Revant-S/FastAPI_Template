from datetime import datetime, timezone
from fastapi import HTTPException
from models.user import UserCreate, UserLogin, ConnectRequest
from database.mongodb import MongoDB
from utils.auth_utils import hash_password, verify_password, create_jwt_token

class AuthController:
    @staticmethod
    async def create_user(connect_request: ConnectRequest):
        try:
            new_user = {
                "eth_address": connect_request.eth_address,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc),
                "is_active": True,
                "contract_count": 0,
                "total_value_locked": 0,
                "role": "user"
            }
            
            result = await MongoDB.user_collection.insert_one(new_user)
            
            if not result.inserted_id:
                raise HTTPException(status_code=500, detail="Failed to create user")
                
            created_user = await MongoDB.user_collection.find_one(
                {"_id": result.inserted_id}
            )
            
            if not created_user:
                raise HTTPException(status_code=404, detail="User created but not found")
                
            created_user["_id"] = str(created_user["_id"])
            created_user["user_id"] = created_user["_id"]
            
            return created_user
            
        except Exception as e:
            if "duplicate key error" in str(e):
                raise HTTPException(status_code=400, detail="User with  already exists")
            raise HTTPException(status_code=500, detail=f"Error creating user: {str(e)}")

    @staticmethod
    async def signup_user(user: UserCreate):
        hashed_password = hash_password(user.password)
        user_dict = user.dict()
        user_dict["password"] = hashed_password
        result = await MongoDB.user_collection.insert_one(user_dict)
        return {"user_id": str(result.inserted_id)}

    @staticmethod
    async def login_user(user: UserLogin):
        db_user = await MongoDB.user_collection.find_one({"email": user.email})
        if not db_user or not verify_password(user.password, db_user["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        token = create_jwt_token(user.email)
        return {"access_token": token, "token_type": "bearer"}

    @staticmethod
    async def get_user_by_account(eth_address: str):
        return await MongoDB.user_collection.find_one({"eth_address": eth_address})

    @staticmethod
    async def update_user_contract_counts(eth_address: str):
        pass

