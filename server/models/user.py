from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr
from models.contracts import ContractResponse

class ConnectRequest(BaseModel):
    eth_address: str

class UserBase(BaseModel):
    eth_address: str = Field(..., description="Ethereum address of the user")
    total_contracts: int = Field(default=0, description="Total number of contracts")
    total_deployed_contracts: int = Field(default=0, description="Total deployed contracts")
    is_active: bool = Field(default=True)
    role: str = Field(default="user")

class UserCreate(UserBase):
    """Schema for creating a new user"""
    password: Optional[str] = Field(None, description="Optional password for traditional auth")

class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    """Schema for updating user information"""
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    total_contracts: Optional[int] = None
    total_deployed_contracts: Optional[int] = None
    is_active: Optional[bool] = None

class UserInfo(UserBase):
    created_at: datetime
    updated_at: datetime
    total_value_locked: float = 0.0
    contract_count: int = 0

class UserResponse(BaseModel):
    """Schema for User Response"""
    user: UserInfo
    contracts: List[ContractResponse]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat()
        }