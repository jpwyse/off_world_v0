import traceback
import sys
from datetime import date
from typing import List
from django.contrib.auth import authenticate
from django.core import serializers
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from django.utils import timezone
from ninja import Router, Schema, ModelSchema, Field, Form
from ninja.security import HttpBearer, APIKeyHeader
from ninja.errors import HttpError
from ninja.responses import Response
from ninja.orm import create_schema
from . models import User, AuthToken
from . schema import UserSchema, RegistrationSchema, LoginSchema, AuthSchema
from . auth import TokenAuth
from . config import CONSTANTS, AUTH_SETTINGS
from . crypto import hash_token



# Create your api's here.

router = Router()

@router.post("/register")
def register(request, reg: RegistrationSchema):
	try:
		user = User.objects.create_user(reg.username, reg.email, reg.password)
	except IntegrityError:
		raise HttpError(409, "User already registered.")
	except Exception as error:
		print('\n')
		print(traceback.format_exc())
		print('\n')
		raise HttpError(422, f"{error}")
	else:
		if user and user.is_authenticated:
			user.firstname = reg.firstname.capitalize()
			user.lastname = reg.lastname.capitalize()
			user.phone = reg.phone
			user.dob = reg.dob
			user.gender = reg.gender
			user.passcode = reg.passcode
			user.save()
			_, token = AuthToken.objects.create(user)
			#return {'user': user.username, 'token': token}
			return 200, UserAuthSchema(user=user, token_key=token)
		raise HttpError(405, "User registration not permitted or failed.")



@router.post("/login", response=AuthSchema)
def login(request, login: LoginSchema):
	user = authenticate(request, username=login.username, password=login.password)
	if user and user.is_authenticated:
		_, token = AuthToken.objects.create(user)
		#return {'user': user, 'token': token}
		return 200, UserAuthSchema(user=user, token_key=token)
	raise HttpError(401, "Incorrect login credentials.")

				

@router.get("/auth")
def auth(request):
	if 'Authorization' in request.headers:
		auth_header = request.headers.get('Authorization')
		token = auth_header.split()[1]
		try:
			user, token = TokenAuth().authenticate(token=token)
			return 200, UserAuthSchema(user=user, token_key=token)
		except Exception as error:
			raise HttpError(403, "User is not authenticated.")
	else:
		print("Authorization not in headers.")
		raise HttpError(401, "User is not authenticated.")



@router.get("/logout")
def logout(request):
	if 'Authorization' in request.headers:
		auth_header = request.headers.get('Authorization')
		token = auth_header.split()[1]
		try:
			AuthToken.objects.filter(token_key=token[:CONSTANTS.TOKEN_KEY_LENGTH]).delete()
		except Exception as error:
			raise HttpError(405, f"{error}")
		else:
			return Response("User has been logged out.", status=205)
	else:
		print("Authorization not in headers.")
		raise HttpError(412, "Authorization token not in headers.")



##Auth Utility Requests##

@router.get("/validate_registration/{value}")
def validate_registration(request, value: str):
	form_value = list(value)

	if "@" in form_value:
		try:
			user = User.objects.get(email=value)
		except User.DoesNotExist:
			return {"success": True}
		else:
			return False
	else:
		try:
			user = User.objects.get(username=value)
		except User.DoesNotExist:
			return True
		else:
			return False


@router.get("/verify_passcode/{passcode}")
def verify_passcode(request, passcode: str):
	passcode_list = ['fidelio', 'cicifly', 'mongoose', 'aunty']

	for item in passcode_list:
		if item == passcode:
			return True
		else:
			return False












