from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, backref

from Backend.db.database import Base


class Phrase(Base):
    __tablename__ = 'phrase'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    text = Column(String)

    # user = relationship('User', backref=backref('phrases', cascade='all,delete'))

    def __repr__(self):
        return '<Phrase: {}>'.format(self.user_id)