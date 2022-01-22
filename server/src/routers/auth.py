from fastapi import APIRouter

router = APIRouter(
    tags=["Auth"]
)


@router.post("/register")
async def register(user_id: int):
    return user_id


@router.post("/login")
async def login(user_id: int):
    return user_id
