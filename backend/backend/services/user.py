import bcrypt
from typing import List, Optional
from ..models.user import User
from ..schemas.user import UserCreateSchema, UserUpdateSchema, UserSchema
from marshmallow import ValidationError
from sqlalchemy.orm import Session

class UserService:
    """Service untuk operasi pengguna."""

    @staticmethod
    def get_all_users(db: Session) -> List[User]:
        """Dapatkan semua pengguna."""
        return db.query(User).all()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        """Dapatkan pengguna berdasarkan ID."""
        return db.query(User).get(user_id)

    @staticmethod
    def get_user_by_username(dbsession, username):
        return dbsession.query(User).filter(User.username == username).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """Dapatkan pengguna berdasarkan email."""
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create_user(dbsession, user_data):
        user = User(**user_data)
        dbsession.add(user)
        dbsession.flush()
        return user

    @staticmethod
    def update_user(db: Session, user: User, update_data: dict) -> User:
        """Perbarui pengguna."""
        try:
            validated_data = UserUpdateSchema().load(update_data, partial=True)
            if "password" in validated_data:
                validated_data["password"] = bcrypt.hashpw(
                    validated_data["password"].encode("utf-8"), bcrypt.gensalt()
                ).decode("utf-8")
            for key, value in validated_data.items():
                setattr(user, key, value)
            db.commit()
            db.refresh(user)
            return user
        except ValidationError as e:
            raise ValueError(e.messages)

    @staticmethod
    def delete_user(db: Session, user: User) -> None:
        """Hapus pengguna."""
        db.delete(user)
        db.commit()