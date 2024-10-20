from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING

class MongoDB:
    client: AsyncIOMotorClient = None
    database = None
    user_collection = None
    contract_collection = None

    @classmethod
    async def connect_to_mongo(cls):
        cls.client = AsyncIOMotorClient("mongodb://localhost:27017")
        cls.database = cls.client.auth_db
        cls.user_collection = cls.database.users
        cls.contract_collection = cls.database.contracts  # Initialize contract_collection
        
        # Create unique index on email
        await cls.user_collection.create_index([("email", ASCENDING)], unique=True)

    @classmethod
    async def close_mongo_connection(cls):
        if cls.client:
            await cls.client.close()
