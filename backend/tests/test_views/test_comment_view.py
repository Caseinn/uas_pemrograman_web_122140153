from backend.views.comment import create_comment, get_comments
from pyramid.testing import DummyRequest
from backend.models.user import User
from backend.models.recipe import Recipe

def test_create_comment_success(dbsession):
    user = User(username="commenter", email="c@example.com", password="pass", role="user")
    recipe = Recipe(title="Ayam Bakar", description="desc", ingredients="ayam", steps="bakar")

    dbsession.add_all([user, recipe])
    dbsession.flush()

    req = DummyRequest(json_body={
        "user_id": user.id,
        "recipe_id": recipe.id,
        "comment_text": "Mantap!"
    })
    req.dbsession = dbsession

    response = create_comment(req)
    assert response["comment_text"] == "Mantap!"

def test_get_comments_by_recipe_id(dbsession):
    req = DummyRequest(params={"recipe_id": "1"})
    req.dbsession = dbsession
    response = get_comments(req)
    assert isinstance(response, list)
