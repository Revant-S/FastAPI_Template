from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime
from enum import Enum
from bson import ObjectId

class ObjectStatus(str, Enum):
    PENDING = 'PENDING'
    DEPLOYED = 'DEPLOYED'

class ContractCreate(BaseModel):
    name: str
    client_address: str
    description: Optional[str] = None
    symbol: Optional[str] = None
    object_id: Optional[str] = None
    object_status: ObjectStatus = ObjectStatus.PENDING  # Set default using enum
    
    class Config:
        orm_mode = True

class Remaining(BaseModel):
    dropDown: Dict
    feature: Dict

class ContractResponse(BaseModel):
    code: str
    preview: str
    gas_price: Optional[float] = None
    contractId: str  # Changed from ObjectId to str

    @classmethod
    def from_object_id(cls, contract_id: ObjectId):
        return cls(contractId=str(contract_id), code="", preview="", gas_price=None)
