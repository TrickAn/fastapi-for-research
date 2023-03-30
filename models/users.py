from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from db.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    is_active = Column(Boolean, default=True)
    hashed_password = Column(String)

    phrases = relationship("Phrase", back_populates="user")
