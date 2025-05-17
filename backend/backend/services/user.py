import bcrypt
from typing import List, Optional
from ..models.user import User
from ..schemas.user import UserCreateSchema, UserUpdateSchema, UserSchema
from marshmallow import ValidationError
from sqlalchemy.orm import Session
import bcrypt

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
    def validate_username(username: str):
        if not username:
            raise ValueError("Username wajib diisi")
        if len(username) < 3:
            raise ValueError(f"Username minimal 3 karakter")
        if len(username) > 50:
            raise ValueError(f"Username maksimal 50 karakter")
        return username

    @staticmethod
    def hash_password(password: str) -> str:
        if len(password) < 8:
            raise ValueError("Password harus minimal 8 karakter")
        return bcrypt.hashpw(
            password.encode("utf-8"), 
            bcrypt.gensalt()
        ).decode("utf-8")

    @staticmethod
    def create_user(dbsession, user_data):
        """Validate and create user"""
        try:
            validated_data = UserCreateSchema().load(user_data)
        except ValidationError as err:
            raise err
        
        UserService.validate_username(validated_data["username"])
            
        if "password" in validated_data:
                    validated_data["password"] = UserService.hash_password(validated_data["password"])
            
        user = User(**validated_data)
        dbsession.add(user)
        dbsession.flush()
        return user

    @staticmethod
    def update_user(db: Session, user: User, update_data: dict) -> User:
        try:
            validated_data = UserUpdateSchema().load(update_data, partial=True)
            if "password" in validated_data:
                validated_data["password"] = UserService.hash_password(validated_data["password"])
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