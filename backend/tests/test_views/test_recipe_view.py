from backend.views.recipe import create_recipe, get_recipes
from pyramid.testing import DummyRequest

def test_create_recipe_json_success(dbsession):
    req = DummyRequest(json_body={
        "title": "Bakso",
        "description": "Daging kenyal",
        "ingredients": "daging\ntepung",
        "steps": "campur\nmasak",
        "image": "https://lorem.picsum.com/200/200"
    })
    req.dbsession = dbsession
    req.content_type = "application/json"

    response = create_recipe(req)
    assert response["title"] == "Bakso"

def test_get_all_recipes(dbsession):
    req = DummyRequest()
    req.dbsession = dbsession
    response = get_recipes(req)
    assert isinstance(response, list)
