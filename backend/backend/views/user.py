from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
    HTTPNoContent
)
from ..models.user import User
from ..services.user import UserService
from ..schemas.user import (
    UserSchema,
    UserCreateSchema,
    UserUpdateSchema
)
from pyramid.httpexceptions import HTTPUnauthorized

import bcrypt

from marshmallow.exceptions import ValidationError

@view_config(route_name='api_v1.users', request_method='GET', renderer='json')
def get_users(request):
    """Dapatkan semua pengguna."""
    users = UserService.get_all_users(request.dbsession)
    return UserSchema(many=True).dump(users)

@view_config(route_name='api_v1.users', request_method='POST', renderer='json')
def create_user(request):
    """Buat pengguna baru."""
    try:
        user_data = UserCreateSchema().load(request.json_body)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})
    
    if UserService.get_user_by_email(request.dbsession, user_data['email']):
        raise HTTPBadRequest(json={'errors': {'email': ['Email sudah digunakan']}})
    
    if UserService.get_user_by_username(request.dbsession, user_data['username']):
        raise HTTPBadRequest(json={'errors': {'username': ['Username sudah digunakan']}})
    
    user = UserService.create_user(request.dbsession, user_data)
    return UserSchema().dump(user)

@view_config(route_name='api_v1.user', request_method='GET', renderer='json')
def get_user(request):
    """Dapatkan pengguna berdasarkan ID."""
    user_id = int(request.matchdict['id'])
    user = UserService.get_user_by_id(request.dbsession, user_id)
    
    if not user:
        raise HTTPNotFound()
    
    return UserSchema().dump(user)

@view_config(route_name='api_v1.user', request_method='PUT', renderer='json')
def update_user(request):
    """Perbarui pengguna."""
    user_id = int(request.matchdict['id'])
    user = UserService.get_user_by_id(request.dbsession, user_id)
    
    if not user:
        raise HTTPNotFound()
    
    try:
        update_data = UserUpdateSchema().load(request.json_body, partial=True)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})
    
    updated_user = UserService.update_user(request.dbsession, user, update_data)
    return UserSchema().dump(updated_user)

@view_config(route_name='api_v1.user', request_method='DELETE')
def delete_user(request):
    """Hapus pengguna."""
    user_id = int(request.matchdict['id'])
    user = UserService.get_user_by_id(request.dbsession, user_id)
    
    if not user:
        raise HTTPNotFound()
    
    UserService.delete_user(request.dbsession, user)
    return HTTPNoContent()