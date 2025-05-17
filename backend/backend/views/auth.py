from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPUnauthorized
)
from pyramid.response import Response
from pyramid.security import remember, forget
from ..models.user import User
from ..services.user import UserService
from ..schemas.user import (
    UserSchema,
    UserCreateSchema,
)
import bcrypt
from marshmallow import ValidationError

@view_config(route_name='api_v1.login', request_method='POST', renderer='json')
def login(request):
    data = request.json_body
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        raise HTTPUnauthorized(json={'message': 'Username and password are required.'})

    user = UserService.get_user_by_username(request.dbsession, username)
    if not user or not user.check_password(password):
        raise HTTPUnauthorized(json={'message': 'Invalid username or password. Please try again.'})

    headers = remember(request, user.id)

    return Response(
        json={
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'role': user.role
            }
        },
        headers=headers
    )

@view_config(route_name='api_v1.register', request_method='POST', renderer='json')
def register(request):
    try:
        user_data = UserCreateSchema().load(request.json_body)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    user_data['role'] = 'user'

    raw_password = user_data.pop('password')
    user_data['password'] = raw_password 

    if UserService.get_user_by_email(request.dbsession, user_data['email']):
        raise HTTPBadRequest(json={'errors': {'email': ['Email already taken']}})
    if UserService.get_user_by_username(request.dbsession, user_data['username']):
        raise HTTPBadRequest(json={'errors': {'username': ['Username already taken']}})
    
    user = UserService.create_user(request.dbsession, user_data)
    return Response(
        json=UserSchema().dump(user),
        status=201
    )

@view_config(route_name='api_v1.logout', request_method='POST', renderer='json')
def logout(request):
    headers = forget(request)  # This removes the auth_tkt cookie
    return Response(
        json={'message': 'Logged out successfully'},
        headers=headers
    )