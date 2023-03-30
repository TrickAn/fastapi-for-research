from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref

from db.database import Base


class Phrase(Base):
    __tablename__ = 'phrases'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    text = Column(String)

    user = relationship('User', back_populates='phrases')
