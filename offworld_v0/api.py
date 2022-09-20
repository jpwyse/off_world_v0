from ninja import NinjaAPI
from Users.api import router as users_router

api = NinjaAPI()
api.add_router("/users/", users_router)








