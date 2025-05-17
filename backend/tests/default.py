from pyramid import testing
from backend.views import default, notfound

def test_default_view():
    response = default.home(testing.DummyRequest())
    assert response == {"message": "Welcome to the API"}

def test_notfound_view():
    request = testing.DummyRequest()
    response = notfound.notfound_view(request)
    assert response.status_code == 404