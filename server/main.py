from fastapi import FastAPI # type: ignore
from routes import auth
from database.mongodb import MongoDB
import uvicorn # type: ignore
import routes.auth as authRouter
import routes.contractRoutes as contractRoutes
app = FastAPI()


@app.on_event("startup")
async def startup_event():
    await MongoDB.connect_to_mongo()
    print("Server started")

@app.on_event("shutdown")
async def shutdown_event():
    await MongoDB.close_mongo_connection()
    print("Server closed")

@app.get("/")
def test() :
    return "Working"

app.include_router(authRouter.router, prefix="/api/auth", tags=["auth"])
app.include_router(contractRoutes.router, prefix = "/api/contracts", tags = ["contracts"])


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)