from sqlalchemy import Column, Integer, String, ForeignKey
from Backend.db.database import Base


class Phrase(Base):
    __tablename__ = 'phrase'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    text = Column(String)

    def __repr__(self):
        return '<Phrase: {}>'.format(self.user_id)
