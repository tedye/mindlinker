# -*- coding: utf-8 -*-
import copy
import datetime
import json

from flask import current_app
from flask_admin.contrib.mongoengine import ModelView
from flask_login import LoginManager
from flask_login import current_user
from flask_login import login_required
from flask_login import login_user
from flask_login import logout_user
from flask_login import UserMixin
from flask_login import AnonymousUserMixin
from flask_login import confirm_login
from flask_login import fresh_login_required
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

import models
from constants import DEFAULT_GAME_MAP


class User(UserMixin):
    """Wrap around mongodb User document.
    """
    def __init__(
        self,
        user_id=None,
        email=None,
        username=None,
        password=None,
        mentor=None,
        role=None,
        register_t=None,
        expire_t=None,
        last_active_t=None,
        game_status=None,
    ):
        self.user_id = user_id
        self.email = email
        self.username = username
        self.password = password
        self.mentor = mentor
        self.role = role
        self.register_t = register_t
        self.expire_t = expire_t
        self.last_active_t = last_active_t
        self.game_status = game_status or copy.deepcopy(
            json.dumps(DEFAULT_GAME_MAP),
        )

    @classmethod
    def from_email(cls, email):
        """Create User oject from doc retrieved by email."""
        current_app.logger.debug("try to load user %s from db." % email)
        try:
            doc = models.User.objects.get(email=email)
        except:
            doc = None
        if doc:
            return cls(
                user_id=doc.user_id,
                email=doc.email,
                username=doc.username,
                password=doc.password,
                mentor=doc.mentor,
                role=doc.role,
                register_t=doc.register_t,
                expire_t=doc.expire_t,
                last_active_t=doc.last_active_t,
                game_status=doc.game_status,
            )
        else:
            current_app.logger.debug(
                "Can not load user %s from db." % email,
            )
            return None

    @classmethod
    def from_user_id(cls, user_id):
        """create User object from doc retrieved by id."""
        try:
            doc = models.User.objects.get(user_id=user_id)
        except:
            doc = None
        if doc:
            return cls(
                user_id=doc.user_id,
                email=doc.email,
                username=doc.username,
                password=doc.password,
                mentor=doc.mentor,
                role=doc.role,
                register_t=doc.register_t,
                expire_t=doc.expire_t,
                last_active_t=doc.last_active_t,
                game_status=doc.game_status,
            )
        else:
            current_app.logger.debug(
                "Can not load user %s from db." % user_id,
            )
            return None

    @classmethod
    def from_doc(cls, doc):
        """create User from doc."""
        return cls(
            user_id=doc.user_id,
            email=doc.email,
            username=doc.username,
            password=doc.password,
            mentor=doc.mentor,
            role=doc.role,
            register_t=doc.register_t,
            expire_t=doc.expire_t,
            last_active_t=doc.last_active_t,
            game_status=doc.game_status,
        )

    def get_user_doc(self):
        if self.user_id:
            return models.User.objects.get(user_id=self.user_id)
        else:
            return None

    def get_id(self):
        """Get user id."""
        return self.user_id

    def save_register(self): 
        """For registration, mentor/role/resgister_t/last_active_t/game_status
        are set to default. And `User.user_id` is assigned by mongodb.

        Default values refer to ``models.User``.
        """
        # Create a new mongodb `User` object.
        current_app.logger.debug('Creating new doc...')
        newUser = models.User(
            user_id=self.user_id,
            email=self.email,
            username=self.username,
            password=self.password,
            role=self.role,
            register_t=self.register_t,
            expire_t=self.expire_t,
            last_active_t=self.last_active_t,
            game_status=self.game_status,
        )
        current_app.logger.debug('Try to save new user...')
        # Save new user doc to db
        newUser.save()
        current_app.logger.debug("new user id = %s saved" % newUser.user_id)
        return self.user_id

    @staticmethod
    def set_password(user_id, new_pwd):
        """Set User password."""
        return _set_doc_field(user_id, 'password', new_pwd)

    @staticmethod
    def set_mentor(user_id, mentor):
        """Set User mentor."""
        return _set_doc_field(user_id, 'mentor', mentor)

    @staticmethod
    def set_game_status(user_id, game_status):
        """Set User game_status."""
        return _set_doc_field(user_id, 'game_status', game_status)

    @staticmethod
    def set_last_active_time(user_id):
        """Set last active timestamp."""
        timestamp = datetime.datetime.now()
        return _set_doc_field(user_id, 'last_active_t', timestamp)

    @classmethod
    def get_users_by_mentor(cls, mentor):
        """Get all users for the given mentor."""
        for doc in models.User.objects(mentor=mentor):
            yield cls.from_doc(doc)


def _set_doc_field(user_id, name, value):
    """Generic set method for user doc field."""
    current_app.logger.debug("Try to load user doc")
    doc = models.User.objects.get(user_id=user_id)
    if not doc:
        current_app.logger.debug("No doc found in db for")
        return False
    current_app.logger.debug("doc found in db for %s" % user_id)
    # Update db
    doc.update(**{name: value})
    current_app.logger.debug("update db completed.")
    return True


class Anonymous(AnonymousUserMixin):
    name = u"Anonymous"


class AdminModelView(ModelView):
    def is_accessible(self):
        if current_user.is_authenticated and current_user.role == 'a':
            return True
        return False
