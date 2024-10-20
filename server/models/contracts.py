from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

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
    dropDown : dict
    feature : dict
class ContractResponse(BaseModel):
    code : str
    preview : str
    gas_price: Optional[float] = None
    contractId : str