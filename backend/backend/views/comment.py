from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPBadRequest,
    HTTPNoContent
)
from ..models.comment import Comment
from ..services.comment import CommentService
from ..schemas.comment import (
    CommentSchema,
    CommentCreateSchema,
    CommentUpdateSchema
)
from marshmallow.exceptions import ValidationError
from ..models.user import User
from ..models.recipe import Recipe
import transaction
from sqlalchemy.orm import joinedload

@view_config(route_name='api_v1.comments', request_method='GET', renderer='json')
def get_comments(request):
    recipe_id = request.params.get('recipe_id')
    if recipe_id:
        try:
            recipe_id = int(recipe_id)
        except ValueError:
            raise HTTPBadRequest(json={'errors': {'recipe_id': ['Harus berupa angka.']}})
        comments = CommentService.get_comments_by_recipe_id(request.dbsession, recipe_id)
    else:
        # Ensure the 'user' relationship is loaded for each comment
        comments = request.dbsession.query(Comment).options(joinedload(Comment.user)).all()

    return CommentSchema(many=True).dump(comments)


@view_config(route_name='api_v1.comments', request_method='POST', renderer='json')
def create_comment(request):
    """Buat komentar baru."""
    try:
        comment_data = CommentCreateSchema().load(request.json_body)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})

    user = request.dbsession.query(User).get(comment_data['user_id'])
    recipe = request.dbsession.query(Recipe).get(comment_data['recipe_id'])

    if not user or not recipe:
        raise HTTPBadRequest(json={'errors': {'foreign_key': ['User atau Recipe tidak ditemukan']}})

    with transaction.manager:
        comment = CommentService.create_comment(request.dbsession, comment_data)

    return CommentSchema().dump(comment)

@view_config(route_name='api_v1.comment', request_method='PUT', renderer='json')
def update_comment(request):
    """Perbarui komentar."""
    comment_id = int(request.matchdict['id'])
    comment = CommentService.get_comment_by_id(request.dbsession, comment_id)
    
    if not comment:
        raise HTTPNotFound()
    
    try:
        update_data = CommentUpdateSchema().load(request.json_body, partial=True)
    except ValidationError as err:
        raise HTTPBadRequest(json={'errors': err.messages})
    
    updated_comment = CommentService.update_comment(request.dbsession, comment, update_data)
    return CommentSchema().dump(updated_comment)


@view_config(route_name='api_v1.comment', request_method='DELETE')
def delete_comment(request):
    """Hapus komentar."""
    comment_id = int(request.matchdict['id'])
    comment = CommentService.get_comment_by_id(request.dbsession, comment_id)
    
    if not comment:
        raise HTTPNotFound()
    
    CommentService.delete_comment(request.dbsession, comment)
    return HTTPNoContent()
