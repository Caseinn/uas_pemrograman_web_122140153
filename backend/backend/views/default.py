from pyramid.view import view_config


@view_config(route_name='home', renderer='json')
def my_view(request):
    """Simple info endpoint for the API root."""
    return {
        "status": "ok",
        "service": "Nel's Kitchen API",
        "version": "v1",
    }
