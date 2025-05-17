from backend.services.recipe import RecipeService

def test_create_and_get_recipe(dbsession):
    recipe_data = {
        "title": "Nasi Uduk",
        "description": "Lezat dan gurih",
        "ingredients": "beras\nsantan",
        "steps": "masak\nhidangkan",
        "image": ""
    }
    recipe = RecipeService.create_recipe(dbsession, recipe_data)
    dbsession.flush()

    result = RecipeService.get_recipe_by_id(dbsession, recipe.id)
    assert result.title == "Nasi Uduk"

    all_recipes = RecipeService.get_all_recipes(dbsession)
    assert any(r.title == "Nasi Uduk" for r in all_recipes)
