from fastapi import APIRouter

router = APIRouter(
    prefix="/password",
    tags=["Password"]
)


@router.get("/")
async def get_passwords(id: int):
    return id


@router.post("/")
async def create_password(id: int):
    return id


@router.put("/{id}")
async def update_password(id: int):
    return id


@router.delete("/{id}")
async def delete_password(id: int):
    return id
