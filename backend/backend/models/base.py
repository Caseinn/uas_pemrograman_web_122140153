from datetime import datetime
import pytz
from sqlalchemy import Column, DateTime, Integer
from .meta import Base

# Set Jakarta timezone
JAKARTA_TZ = pytz.timezone('Asia/Jakarta')

class BaseModel(Base):
    """Base model class for all models."""
    
    __abstract__ = True
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=lambda: datetime.now(JAKARTA_TZ))
    updated_at = Column(DateTime, default=lambda: datetime.now(JAKARTA_TZ), onupdate=lambda: datetime.now(JAKARTA_TZ))
    
    def to_dict(self):
        """Convert model to dictionary."""
        return {column.name: getattr(self, column.name) 
                for column in self.__table__.columns}
