from backend.services.user import UserService

def test_create_and_get_user(dbsession):
    user_data = {
        "username": "alice",
        "email": "alice@example.com",
        "password": "securepass",
    }
    user = UserService.create_user(dbsession, user_data)
    dbsession.flush()
    fetched = UserService.get_user_by_id(dbsession, user.id)
    assert fetched.username == "alice"
