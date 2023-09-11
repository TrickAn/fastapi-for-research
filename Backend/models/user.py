from uuid import uuid4
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from Backend.db.database import Base


def uuid_to_str():
    return str(uuid4())


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, unique=True)
    is_active = Column(Boolean, default=True)
    hashed_password = Column(String)
    description = Column(String, nullable=True)

    phrases = relationship("Phrase", cascade='all,delete', backref='user')

    def __repr__(self):
        return '<User: {}>'.format(self.name)
