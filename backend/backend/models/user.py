import bcrypt
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from .base import BaseModel

class User(BaseModel):
    __tablename__ = 'users'
    
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False) 
    role = Column(String(20), nullable=True, default='user')
    
    comments = relationship("Comment", back_populates="user")

    def set_password(self, password):
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode()
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
    def __repr__(self):
        return f"<User(username='{self.username}', email='{self.email}', role='{self.role}')>"
