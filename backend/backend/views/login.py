from pyramid.view import view_config
from pyramid.httpexceptions import HTTPUnauthorized
from pyramid.response import Response
from pyramid.security import remember
from ..models.user import User
from ..services.user import UserService
import bcrypt

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
