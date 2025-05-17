from backend.models.user import User

def test_user_model_create(dbsession):
    user = User(username="test", email="test@example.com", password="abc123")
    dbsession.add(user)
    dbsession.flush()
    assert user.id is not None
