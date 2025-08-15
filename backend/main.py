from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import get_db
import models

app = FastAPI()

# Optional: create tables from models
models.Base.metadata.create_all(bind=models.engine)

@app.get("/users")
def read_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@app.get("/destinations")
def read_destinations(db: Session = Depends(get_db)):
    destinations = db.query(models.Destination).all()
    return destinations
