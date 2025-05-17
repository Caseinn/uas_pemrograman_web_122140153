from backend.services.comment import CommentService

def test_create_and_get_comment(dbsession):
    # Anda harus buat user dan recipe terlebih dahulu agar ForeignKey valid
    from backend.models.user import User
    from backend.models.recipe import Recipe

    user = User(username="commuser", email="comm@example.com", password="pass123", role="user")
    recipe = Recipe(title="Test Recipe", description="desc", ingredients="ingr", steps="steps")

    dbsession.add(user)
    dbsession.add(recipe)
    dbsession.flush()

    comment_data = {
        "user_id": user.id,
        "recipe_id": recipe.id,
        "comment_text": "Enak banget!"
    }
    comment = CommentService.create_comment(dbsession, comment_data)
    assert comment.comment_text == "Enak banget!"

    result = CommentService.get_comment_by_id(dbsession, comment.id)
    assert result is not None
