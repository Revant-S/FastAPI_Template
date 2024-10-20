from fastapi import APIRouter, Depends
from typing import List, Optional
from controllers.contractController import ContractController
from models.contracts import ContractCreate, ContractResponse, Remaining
from middleware.auth_middleware import verify_token

router = APIRouter()

@router.post("/", response_model=ContractResponse)
async def create_contract(
    contract_data: ContractCreate,
    remaning : Remaining
):
    return await ContractController.create_contract(contract_data, remaning.dropDown , remaning.feature)

@router.get("/{contract_id}", response_model=ContractResponse)
async def get_contract(contract_id: str):
    return await ContractController.get_contract(contract_id)

@router.put("/{contract_id}/status", response_model=ContractResponse)
async def update_contract_status(
    contract_id: str,
    status: str,
    gas_price: Optional[float] = None
):
    return await ContractController.update_contract_status(contract_id, status, gas_price)

@router.get("/user/contracts", response_model=List[ContractResponse])
async def get_user_contracts(token_data: dict = Depends(verify_token)):
    return await ContractController.get_user_contracts(token_data["user_id"])

