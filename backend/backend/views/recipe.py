import os
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
from ..utils.file_upload import save_image, delete_image

@view_config(route_name='api_v1.recipes', request_method='GET', renderer='json')
def get_recipes(request):
    """Dapatkan semua resep."""
    recipes = RecipeService.get_all_recipes(request.dbsession)
    return RecipeSchema(many=True).dump(recipes)

@view_config(route_name='api_v1.recipes', request_method='POST', renderer='json')
def create_recipe(request):
    try:
        if request.content_type.startswith('multipart/form-data'):
            raw_data = dict(request.POST)
            image = raw_data.pop('image', None)
            
            recipe_data = RecipeCreateSchema().load(raw_data)
            
            if hasattr(image, 'file') and getattr(image, 'filename', None):
                recipe_data['image'] = save_image(image)
        else:
            recipe_data = RecipeCreateSchema().load(request.json_body)
            
    except ValidationError as err:
        raise err  # Will be handled by centralized error handler

    # Ensure title is unique
    if RecipeService.get_recipe_by_title(request.dbsession, recipe_data['title']):
        raise HTTPBadRequest(json={
            'errors': {'title': ['Resep dengan judul ini sudah ada']},
            'message': 'Judul resep harus unik'
        })
    
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
    recipe_id = int(request.matchdict['id'])
    recipe = RecipeService.get_recipe_by_id(request.dbsession, recipe_id)
    if not recipe:
        raise HTTPNotFound()

    try:
        update_data = RecipeUpdateSchema().load(request.json_body, partial=True)
    except ValidationError as err:
        raise err

    # Handle image upload
    if request.content_type.startswith('multipart/form-data'):
        image = request.POST.get('image')
        if hasattr(image, 'file') and getattr(image, 'filename', None):
            old_image = recipe.image
            update_data['image'] = save_image(image)
            if old_image:
                delete_image(old_image)

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
