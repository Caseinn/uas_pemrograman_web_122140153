from backend.views.auth import login, register
from pyramid.testing import DummyRequest
import json
from pyramid.httpexceptions import HTTPUnauthorized
from pyramid.response import Response


def test_register_user_success(dbsession):
    req = DummyRequest(json_body={
        "username": "bob",
        "email": "bob@example.com",
        "password": "strongpass",
        "role": "user"
    })
    req.dbsession = dbsession

    response = register(req)

    assert isinstance(response, Response)

    raw = response.body.decode("utf-8") if isinstance(response.body, bytes) else response.body
    data = json.loads(raw)

    # ✅ Sesuai dengan respons sekarang (tidak ada "user" nesting)
    assert data["username"] == "bob"
    assert data["email"] == "bob@example.com"
    assert data["role"] == "user"


def test_login_invalid_credentials(dbsession):
    req = DummyRequest(json_body={"username": "nope", "password": "wrong"})
    req.dbsession = dbsession

    try:
        login(req)
        assert False, "Expected HTTPUnauthorized"
    except HTTPUnauthorized:
        pass
