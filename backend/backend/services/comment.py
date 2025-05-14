from typing import List, Optional
from ..models.comment import Comment
from ..schemas.comment import CommentCreateSchema, CommentUpdateSchema, CommentSchema
from marshmallow import ValidationError
from sqlalchemy.orm import Session

class CommentService:
    """Service untuk operasi komentar."""

    @staticmethod
    def get_all_comments(db: Session) -> List[Comment]:
        """Dapatkan semua komentar."""
        return db.query(Comment).all()

    @staticmethod
    def get_comment_by_id(db: Session, comment_id: int) -> Optional[Comment]:
        """Dapatkan komentar berdasarkan ID."""
        return db.query(Comment).get(comment_id)

    @staticmethod
    def get_comments_by_recipe_id(db: Session, recipe_id: int) -> List[Comment]:
        """Dapatkan semua komentar berdasarkan ID resep."""
        return db.query(Comment).filter(Comment.recipe_id == recipe_id).all()

    @staticmethod
    def get_comments_by_user_id(db: Session, user_id: int) -> List[Comment]:
        """Dapatkan semua komentar berdasarkan ID pengguna."""
        return db.query(Comment).filter(Comment.user_id == user_id).all()

    @staticmethod
    def create_comment(db: Session, comment_data: dict) -> Comment:
        """Buat komentar baru."""
        try:
            validated_data = CommentCreateSchema().load(comment_data)
            comment = Comment(**validated_data)
            db.add(comment)
            db.commit()
            db.refresh(comment)
            return comment
        except ValidationError as e:
            raise ValueError(e.messages)

    @staticmethod
    def update_comment(db: Session, comment: Comment, update_data: dict) -> Comment:
        """Perbarui komentar."""
        try:
            validated_data = CommentUpdateSchema().load(update_data, partial=True)
            for key, value in validated_data.items():
                setattr(comment, key, value)
            db.commit()
            db.refresh(comment)
            return comment
        except ValidationError as e:
            raise ValueError(e.messages)

    @staticmethod
    def delete_comment(db: Session, comment: Comment) -> None:
        """Hapus komentar."""
        db.delete(comment)
        db.commit()