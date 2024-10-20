from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException
from typing import List, Optional
from models.contracts import ContractCreate, ContractResponse
from database.mongodb import MongoDB

class ContractController:
    @staticmethod
    async def create_contract(contract_data: ContractCreate) -> ContractResponse:
        contract = {
            **contract_data.dict(),
            "timestamp": datetime.utcnow(),
            "status": "PENDING"
        }
        
        result = await MongoDB.contract_collection.insert_one(contract)
        
        if result.inserted_id:
            contract_doc = await MongoDB.contract_collection.find_one({"_id": result.inserted_id})
            print(contract_data)
            return ContractResponse(
                code="this is the code",
                preview="this is the preview",
                gas_price=155,
                contractId = result.inserted_id 
)

        raise HTTPException(status_code=500, detail="Failed to create contract")

    @staticmethod
    async def get_contract(contract_id: str) -> ContractResponse:
        if not ObjectId.is_valid(contract_id):
            raise HTTPException(status_code=400, detail="Invalid contract ID")
     
        contract = await MongoDB.contract_collection.find_one({"_id": ObjectId(contract_id)})
        if contract:
            return ContractResponse(
                id=str(contract["_id"]),
                name=contract["name"],
                client_address=contract["client_address"],
                user_id=str(contract["user_id"]),
                timestamp=contract["timestamp"],
                status=contract["status"],
                gas_price=contract.get("gas_price")
            )
        raise HTTPException(status_code=404, detail="Contract not found")

    @staticmethod
    async def update_contract_status(
        contract_id: str,
        status: str,
        updateTo : str,
        gas_price: Optional[float] = None
    ) -> ContractResponse:
        if not ObjectId.is_valid(contract_id):
            raise HTTPException(status_code=400, detail="Invalid contract ID")
        if status == updateTo:
            return HTTPException(status_code=404 , detail = "Status is Already updated")
        update_data = {"status": updateTo}
        if gas_price is not None:
            update_data["gas_price"] = gas_price
            
        result = await MongoDB.contract_collection.update_one(
            {"_id": ObjectId(contract_id)},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Contract not found")
        
        return await ContractController.get_contract(contract_id)

    @staticmethod
    async def get_user_contracts(eth_address: str) -> List[ContractResponse]:
        contracts_cursor = MongoDB.contract_collection.find({"eth_address": eth_address})
        print(contracts_cursor)
        contracts = await contracts_cursor.to_list(None)
        
        return [
            ContractResponse(
                id=str(contract["_id"]),
                name=contract["name"],
                client_address=contract["client_address"],
                user_id=str(contract["user_id"]),
                timestamp=contract["timestamp"],
                status=contract["status"],
                gas_price=contract.get("gas_price")
            )
            for contract in contracts
        ]
