from backend.schemas.user import UserCreateSchema
from backend.schemas.recipe import RecipeCreateSchema
from backend.schemas.comment import CommentCreateSchema
import pytest

def test_user_create_schema_valid():
    data = {
        "username": "tester",
        "email": "tester@example.com",
        "password": "securepass123",
        "role": "user"
    }
    result = UserCreateSchema().load(data)
    assert result["username"] == "tester"

def test_recipe_create_schema_valid():
    data = {
        "title": "Soto Ayam",
        "description": "Masakan khas Indonesia",
        "ingredients": "ayam\nbumbu",
        "steps": "rebus\nsajikan",
        "image": "https://lorem.picsum/200/200"
    }
    result = RecipeCreateSchema().load(data)
    assert result["title"] == "Soto Ayam"

def test_comment_create_schema_valid():
    data = {
        "user_id": 1,
        "recipe_id": 1,
        "comment_text": "Lezat sekali!"
    }
    result = CommentCreateSchema().load(data)
    assert result["comment_text"] == "Lezat sekali!"

@pytest.mark.parametrize("invalid_email", ["notanemail", "user@", "@test.com"])
def test_user_create_schema_invalid_email(invalid_email):
    data = {
        "username": "invaliduser",
        "email": invalid_email,
        "password": "password123",
    }
    with pytest.raises(Exception):
        UserCreateSchema().load(data)
