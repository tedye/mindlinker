# -*- coding: utf-8 -*-
import os

from flask import Flask
from flask_admin import Admin
from flask_mongoengine import MongoEngine
from flask_mongoengine import MongoEngineSessionInterface
from flask_login import LoginManager
from flask_bcrypt import Bcrypt


# Create the main app
app = Flask('Mindlinker_v02', static_folder="assets")
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
# Establish Database connection
app.config['MONGODB_SETTINGS'] = {
    'HOST': os.environ.get('MONGODB_URI'),
    'DB': 'FlaskLogin',
}
db = MongoEngine(app)
app.session_interface = MongoEngineSessionInterface(db)
# Set Debug
app.debug = os.environ.get('DEBUG', False)
# Use Bcrypt to salt user password
flask_bcrypt = Bcrypt()
# Connect to login manager
login_manager = LoginManager()
login_manager.init_app(app)
# Connect to admin
admin = Admin(name='mindmaster', template_mode='bootstrap3')
admin.init_app(app)