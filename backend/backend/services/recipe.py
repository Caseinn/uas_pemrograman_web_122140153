from typing import List, Optional
from ..models.recipe import Recipe
from ..schemas.recipe import RecipeCreateSchema, RecipeUpdateSchema
from sqlalchemy.orm import Session

class RecipeService:
    """Service untuk operasi resep."""

    @staticmethod
    def get_all_recipes(db: Session) -> List[Recipe]:
        return db.query(Recipe).all()

    @staticmethod
    def get_recipe_by_id(db: Session, recipe_id: int) -> Optional[Recipe]:
        return db.query(Recipe).filter(Recipe.id == recipe_id).first()

    @staticmethod
    def get_recipe_by_title(db: Session, title: str) -> Optional[Recipe]:
        return db.query(Recipe).filter(Recipe.title == title).first()

    @staticmethod
    def create_recipe(db: Session, recipe_data: dict) -> Recipe:
        validated_data = RecipeCreateSchema().load(recipe_data)
        recipe = Recipe(**validated_data)
        db.add(recipe)
        return recipe

    @staticmethod
    def update_recipe(db: Session, recipe: Recipe, update_data: dict) -> Recipe:
        validated_data = RecipeUpdateSchema().load(update_data, partial=True)
        for key, value in validated_data.items():
            setattr(recipe, key, value)
        return recipe

    @staticmethod
    def delete_recipe(db: Session, recipe: Recipe) -> None:
        db.delete(recipe)
