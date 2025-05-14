from sqlalchemy import Column, String, Text, Integer
from sqlalchemy.orm import relationship
from .base import BaseModel

class Recipe(BaseModel):
    """Model for recipes."""
    __tablename__ = 'recipes'
    
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=False)
    ingredients = Column(Text, nullable=False)
    steps = Column(Text, nullable=False)
    image = Column(String(500), nullable=True)
    
    # Relationship with comments
    comments = relationship("Comment", back_populates="recipe")
    
    def __repr__(self):
        return f"<Recipe(title='{self.title}', id='{self.id}')>"

