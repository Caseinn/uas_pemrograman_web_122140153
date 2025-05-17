from backend.views.cors import cors_tween_factory

def dummy_handler(request):
    return request

def test_cors_headers_added():
    from pyramid.testing import DummyRequest
    tween = cors_tween_factory(dummy_handler, None)
    request = DummyRequest()
    response = tween(request)
    assert "Access-Control-Allow-Origin" in response.headers