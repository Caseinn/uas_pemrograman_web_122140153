from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
    HTTPNoContent
)
from ..models.recipe import Recipe
from ..services.recipe import RecipeService
from ..schemas.recipe import (
    RecipeSchema,
    RecipeCreateSchema,
    RecipeUpdateSchema
)

from marshmallow.exceptions import ValidationError

@view_config(route_name='api_v1.recipes', request_method='GET', renderer='json')
def get_recipes(request):
    """Dapatkan semua resep."""
    recipes = RecipeService.get_all_recipes(request.dbsession)
    return RecipeSchema(many=True).dump(recipes)

@view_config(route_name='api_v1.recipes', request_method='POST', renderer='json')
def create_recipe(request):
    """Buat resep baru."""
    try:
        recipe_data = RecipeCreateSchema().load(request.json_body)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})
    
    if RecipeService.get_recipe_by_title(request.dbsession, recipe_data['title']):
        raise HTTPBadRequest(json={'errors': {'title': ['Resep dengan judul ini sudah ada']}})
    
    recipe = RecipeService.create_recipe(request.dbsession, recipe_data)
    return RecipeSchema().dump(recipe)

@view_config(route_name='api_v1.recipe', request_method='GET', renderer='json')
def get_recipe(request):
    """Dapatkan resep berdasarkan ID."""
    recipe_id = int(request.matchdict['id'])
    recipe = RecipeService.get_recipe_by_id(request.dbsession, recipe_id)
    
    if not recipe:
        raise HTTPNotFound()
    
    return RecipeSchema().dump(recipe)

@view_config(route_name='api_v1.recipe', request_method='PUT', renderer='json')
def update_recipe(request):
    """Perbarui resep."""
    recipe_id = int(request.matchdict['id'])
    recipe = RecipeService.get_recipe_by_id(request.dbsession, recipe_id)
    
    if not recipe:
        raise HTTPNotFound()
    
    try:
        update_data = RecipeUpdateSchema().load(request.json_body, partial=True)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})
    
    updated_recipe = RecipeService.update_recipe(request.dbsession, recipe, update_data)
    return RecipeSchema().dump(updated_recipe)

@view_config(route_name='api_v1.recipe', request_method='DELETE')
def delete_recipe(request):
    """Hapus resep (hard delete)."""
    recipe_id = int(request.matchdict['id'])
    recipe = RecipeService.get_recipe_by_id(request.dbsession, recipe_id)
    
    if not recipe:
        raise HTTPNotFound()
    
    RecipeService.delete_recipe(request.dbsession, recipe)
    return HTTPNoContent()
