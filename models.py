# -*- coding: utf-8 -*-
import datetime

from app import db
from constants import ROLES


class AccessCode(db.Document):
    """AccessCode class for mongodb document."""
    access_code = db.StringField(primary_key=True)
    role = db.StringField(default='s', choices=ROLES)
    expiration = db.IntField(default=90)


class User(db.Document):
    """User class for mongodb document."""
    user_id = db.StringField(primary_key=True)
    email = db.EmailField(unique=True, required=True)
    username = db.StringField(unique=True, required=True)
    password = db.StringField(default=True, required=True)
    mentor = db.StringField(default='admin')
    role = db.StringField(default='s', choices=ROLES)
    register_t = db.DateTimeField(default=datetime.datetime.now())
    expire_t = db.DateTimeField(default=datetime.datetime.now())
    last_active_t = db.DateTimeField(default=datetime.datetime.now())
    game_status = db.StringField(default='')
