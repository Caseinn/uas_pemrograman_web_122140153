from backend.views.auth import login, register
from pyramid.testing import DummyRequest
import json
from pyramid.httpexceptions import HTTPUnauthorized


def test_register_user_success(dbsession):
    # Buat request registrasi
    req = DummyRequest(json_body={
        "username": "bob",
        "email": "bob@example.com",
        "password": "strongpass",
        "role": "user"
    })
    req.dbsession = dbsession

    # Jalankan fungsi register
    response = register(req)

    # Pastikan response adalah instance Response
    assert hasattr(response, "body")

    # Parse body ke dict
    data = json.loads(response.body)

    # Cek isi response
    assert data["user"]["username"] == "bob"

def test_login_invalid_credentials(dbsession):
    # Buat request login dengan akun yang belum ada
    req = DummyRequest(json_body={"username": "nope", "password": "wrong"})
    req.dbsession = dbsession
    

    # Harus gagal dengan HTTPUnauthorized
    try:
        login(req)
        assert False, "Expected HTTPUnauthorized"
    except HTTPUnauthorized:
        pass 
