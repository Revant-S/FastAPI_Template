# routes/auth_routes.py
from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
from controllers.authControllers import AuthController
from controllers.contractController import ContractController
from models.user import ConnectRequest, UserCreate, UserResponse, UserLogin
from middleware.auth_middleware import verify_token

router = APIRouter()


@router.post("/connect", response_model=UserResponse)
async def connect_user(connect_request: ConnectRequest):
    
    user = await AuthController.get_user_by_account(connect_request.eth_address)
    if not user:
        user = await AuthController.create_user(connect_request)
        return {
            "user" : user,
            "contracts" : []
        }
    contracts = await ContractController.get_user_contracts(user['eth_address'])
    
    return {
        "user": user,
        "contracts": contracts
    }

@router.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate):
    return await AuthController.signup_user(user)

@router.post("/login")
async def login(user: UserLogin):
    return await AuthController.login_user(user)

@router.get("/protected", response_model=UserResponse)
async def protected_route(token_data: dict = Depends(verify_token)):
    return await AuthController.get_protected_user_data(token_data["email"])
