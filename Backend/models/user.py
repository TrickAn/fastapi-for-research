from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship, backref

from Backend.db.database import Base


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    is_active = Column(Boolean, default=True)
    hashed_password = Column(String)
    description = Column(String)

    phrases = relationship("Phrase", cascade='all,delete', backref='user')

    def __repr__(self):
        return '<User: {}>'.format(self.name)