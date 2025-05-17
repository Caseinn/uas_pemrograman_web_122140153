from typing import List, Optional
from ..models.comment import Comment
from ..schemas.comment import CommentCreateSchema, CommentUpdateSchema, CommentSchema
from marshmallow import ValidationError
from sqlalchemy.orm import Session
from pyramid.httpexceptions import HTTPBadRequest
import transaction

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
        """Buat komentar baru dengan transaction management."""
        try:
            # Validate the incoming data with the schema
            validated_data = CommentCreateSchema().load(comment_data)
            
            # Create the Comment object from validated data
            comment = Comment(**validated_data)

            # Use transaction manager to handle the commit
            with transaction.manager:
                db.add(comment)  # Add comment to the session
                db.flush()  # Flush the session, synchronizing the database but not committing yet
                db.refresh(comment)  # Refresh the comment object with its ID and other fields

            # After the transaction manager context, the object will be persistent, and you can return it
            return comment
        except ValidationError as e:
            # Handle validation errors and return a BadRequest
            raise HTTPBadRequest(json={'errors': e.messages})

    @staticmethod
    def update_comment(db: Session, comment: Comment, update_data: dict) -> Comment:
        """Perbarui komentar dengan transaction management."""
        try:
            # Validate the update data
            validated_data = CommentUpdateSchema().load(update_data, partial=True)
            
            # Update the comment attributes
            for key, value in validated_data.items():
                setattr(comment, key, value)

            # Ensure the transaction manager is used
            with transaction.manager:
                db.commit()  # Commit the transaction to save changes
                db.refresh(comment)  # Refresh the comment object

            return comment
        except ValidationError as e:
            # Handle validation errors
            raise ValueError(e.messages)

    @staticmethod
    def delete_comment(db: Session, comment: Comment) -> None:
        """Hapus komentar dengan transaction management."""
        with transaction.manager:
            db.delete(comment)  # Mark the comment for deletion
            db.commit()  # Commit the transaction to delete the comment
