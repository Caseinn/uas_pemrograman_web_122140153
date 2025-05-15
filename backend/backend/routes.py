def includeme(config):
    config.add_static_view(name='static', path='backend:static', cache_max_age=3600)
    config.add_route('home', '/')

    config.add_route('api_v1.recipes', '/api/v1/recipes')
    config.add_route('api_v1.recipe', '/api/v1/recipes/{id}')
    
    config.add_route('api_v1.users', '/api/v1/users')
    config.add_route('api_v1.user', '/api/v1/users/{id}')

    config.add_route('api_v1.comments', '/api/v1/comments')
    config.add_route('api_v1.comment', '/api/v1/comments/{id}')

    config.add_route('api_v1.login', '/api/v1/login')
    config.add_route('api_v1.register', '/api/v1/register')
    config.add_route('api_v1.logout', '/api/v1/logout')