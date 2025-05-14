from sqlalchemy import Column, Text, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .base import BaseModel
from datetime import datetime

class Comment(BaseModel):
    """Model for recipe comments."""
    __tablename__ = 'comments'
    
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    recipe_id = Column(Integer, ForeignKey('recipes.id'), nullable=False)
    comment_text = Column(Text, nullable=False)

    
    # Relationships
    user = relationship("User", back_populates="comments")
    recipe = relationship("Recipe", back_populates="comments")
    
    def __repr__(self):
        return f"<Comment(id='{self.id}', user_id='{self.user_id}', recipe_id='{self.recipe_id}')>"

