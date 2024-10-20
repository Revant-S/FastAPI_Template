from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ContractCreate(BaseModel):
    name: str
    client_address: str
    description: Optional[str] = None

class ContractResponse(BaseModel):
    id: str
    name: str
    client_address: str
    user_id: str
    timestamp: datetime
    status: str
    gas_price: Optional[float] = None
    
    class Config:
        orm_mode = True
