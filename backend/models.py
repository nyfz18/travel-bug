from sqlalchemy import Column, Integer, String, Float, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    created_at = Column(TIMESTAMP, server_default=func.now())

class Destination(Base):
    __tablename__ = "destinations"

    destination_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    country = Column(String(50))
    type = Column(String(50))
    avg_budget = Column(Integer)
    best_season = Column(String(50))
    latitude = Column(Float)
    longitude = Column(Float)

class Preference(Base):
    __tablename__ = "preferences"

    preference_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))
    destination_id = Column(Integer, ForeignKey("destinations.destination_id"))
    rating = Column(Integer)
    created_at = Column(TIMESTAMP, server_default=func.now())
