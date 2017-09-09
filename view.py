# -*- coding: utf-8 -*-
from flask import current_app
from flask import flash
from flask import render_template
from flask import request
from flask import redirect
from flask_login import current_user
from flask_login import login_required
from flask_login import login_user
from flask_login import logout_user
from flask_login import confirm_login
from flask_login import fresh_login_required
from jinja2 import TemplateNotFound

import forms
import models
from app import admin
from app import app
from app import login_manager
from app import flask_bcrypt
from libs.User import User
from libs.User import AdminModelView



# Configure routes
@app.route('/')
def main():
    return redirect('/game')


# Login/logout
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and 'email' in request.form:
        email = request.form['email']
        user_obj = User()
        user = user_obj.get_by_email_w_password(email)
        if (
            user and  # user exists in db
            flask_bcrypt.check_password_hash(
                user.password,
                request.form['password'],
            ) and  # user pw stored matched
            user.is_active  # user is active now
        ):
            remember = request.form.get('remember', 'no') == 'yes'
            if login_user(user, remember=remember):
                flash('登录成功!')
                return redirect('/game')
            else:
                flash('登录失败!')
    return render_template('/auth/login.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    register_form = forms.SignupForm(request.form)
    current_app.logger.info(request.form)
    if request.method == 'POST' and not register_form.validate():
        current_app.logger.info(register_form.errors)
        return '注册失败！'
    elif request.method == 'POST' and register_form.validate():
        email = request.form['email']
        password_hash = flask_bcrypt.generate_password_hash(
            request.form['password'],
        )
        # Prepare User with register info from form
        user = User(email, password_hash)

        try:
            user.save()
            if login_user(user, remember='no'):
                flash('登录成功!')
                return redirect('/game')
            else:
                flash('登录失败!')
        except:
            flash('无法注册此电子邮箱地址！')
            current_app.logger.error(
                'Error on Registration - possible duplicate emails.'
            )

    # Prepare registration form
    template_data = {'form': register_form}
    return render_template('/auth/register.html', **template_data)


@app.route('/logout')
def logout():
    logout_user()
    flash('登出！')
    return redirect('/login')


@login_manager.unauthorized_handler
def unauthorized_callback():
    return redirect('/login')


@login_manager.user_loader
def load_user(id):
    if id is None:
        redicrect('/login')
    user = User()
    user.get_by_id(id)
    if user.is_active:
        return user
    else:
        return None


# Route for game
@app.route('/game')
@login_required
def game():
    return render_template('/index.html')


# Add model to flask-admin
admin.add_view(AdminModelView(models.User))