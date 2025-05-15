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

UPLOAD_FOLDER = 'backend/static/images/recipes'

@view_config(route_name='api_v1.recipes', request_method='GET', renderer='json')
def get_recipes(request):
    """Dapatkan semua resep."""
    recipes = RecipeService.get_all_recipes(request.dbsession)
    return RecipeSchema(many=True).dump(recipes)

@view_config(route_name='api_v1.recipes', request_method='POST', renderer='json')
def create_recipe(request):
    content_type = request.content_type

    # Use POST for multipart/form-data, json_body for application/json
    if content_type.startswith('multipart/form-data'):
        raw_data = dict(request.POST)
        try:
            # Remove 'image' temporarily to validate rest of the fields
            image = raw_data.pop('image', None)
            recipe_data = RecipeCreateSchema().load(raw_data)
            if hasattr(image, 'file'):
                recipe_data['image'] = image  # Add back image field manually
        except ValidationError as err:
            raise HTTPBadRequest(json={'errors': err.messages})
    elif content_type.startswith('application/json'):
        try:
            recipe_data = RecipeCreateSchema().load(request.json_body)
        except ValidationError as err:
            raise HTTPBadRequest(json={'errors': err.messages})
    else:
        raise HTTPBadRequest(json={'error': 'Unsupported Content-Type'})

    # Ensure title is unique
    if RecipeService.get_recipe_by_title(request.dbsession, recipe_data['title']):
        raise HTTPBadRequest(json={'errors': {'title': ['Resep dengan judul ini sudah ada']}})

    # Handle image upload
    image_url = None
    if 'image' in recipe_data and hasattr(recipe_data['image'], 'file'):
        image_file = recipe_data['image'].file
        filename = recipe_data['image'].filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        # Create directory if not exists
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        # Save image
        with open(file_path, 'wb') as f:
            image_file.seek(0)
            while True:
                chunk = image_file.read(1024 * 1024)
                if not chunk:
                    break
                f.write(chunk)

        image_url = f'/static/images/recipes/{filename}'

    # Set final image URL
    recipe_data['image'] = image_url

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
        raise HTTPBadRequest(json={'errors': err.messages})

    # Handle image upload
    if 'image' in request.POST:
        image = request.POST['image'].file
        filename = request.POST['image'].filename
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        # Save new image
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        with open(file_path, 'wb') as f:
            image.seek(0)
            while True:
                chunk = image.read(1024 * 1024)
                if not chunk:
                    break
                f.write(chunk)

        update_data['image'] = f'/static/images/recipes/{filename}'

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
