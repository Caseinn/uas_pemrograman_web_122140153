from pyramid import testing
from pyramid.interfaces import IRoutesMapper
from backend import routes

def test_routes_added():
    config = testing.setUp()
    routes.includeme(config)
    mapper = config.registry.queryUtility(IRoutesMapper)
    assert mapper is not None

    route_names = [r.name for r in mapper.get_routes()]
    expected = [
        'home', 'api_v1.recipes', 'api_v1.recipe',
        'api_v1.users', 'api_v1.user',
        'api_v1.comments', 'api_v1.comment',
        'api_v1.login', 'api_v1.register', 'api_v1.logout'
    ]
    for name in expected:
        assert name in route_names
