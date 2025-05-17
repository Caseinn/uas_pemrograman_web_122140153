from backend.views.user import create_user, get_users
from pyramid.testing import DummyRequest

def test_create_user_success(dbsession):
    req = DummyRequest(json_body={
        "username": "userbaru",
        "email": "new@example.com",
        "password": "passwordku",
        "role": "user"  # tambahkan role!
    })
    req.dbsession = dbsession
    response = create_user(req)
    assert response["email"] == "new@example.com"

def test_get_all_users(dbsession):
    req = DummyRequest()
    req.dbsession = dbsession
    response = get_users(req)
    assert isinstance(response, list)
