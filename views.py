# -*- coding: utf-8 -*-
"""Define routing for the application.
    `/`:
        home page, redirect to `/getUserGameStatuses`.
    `/login`:
        login page, redirect to `/getUserGameStatuses`.
    `/logout`:
        logout, redirect to `/login`.
    `/register`:
        registration page, redirect to `/getUserGameStatuses`.
    `/game`:
        main game page.
    `/userGameStatuses`:
        user game status page.
    `/studentGameStatuses`:
        student game status page, require `role == 'mentor'` or above.
    `/updateTaskStatusByUserIdByGameIdByTaskId`:
        update game status for given game/task id.
    `/assignMentor`:
        assign mentor to current user.
    `/admin`:
        management page for editing dbs, require `role == 'admin'`.
"""
import datetime
import json
import uuid

from flask import current_app
from flask import flash
from flask import jsonify
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
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
from libs.access_code import AccessCode
from libs.user import User
from libs.user import AdminModelView
from utils import recaptchaCheck


@app.after_request
def add_header(response):
    response.cache_control.no_store = True
    return response


@login_manager.unauthorized_handler
def unauthorized_callback():
    return redirect('/login')


@login_manager.user_loader
def load_user(user_id):
    return User.from_user_id(user_id)


# Configure routes
@app.route('/')
def main():
    return redirect('/userGameStatuses')


# Login/logout
@app.route('/login', methods=['GET','POST'])
def login():
    error_message = ''
    if request.method == 'POST':
        #if not recaptchaCheck(request.form['g-recaptcha-response']):
            #return '请点击人机身份验证!'
        # check form keys
        if 'email' in request.form and 'password' in request.form:
            user = User.from_email(request.form['email'])
            if user is None:
                error_message = '此邮箱可能并未注册'
                current_app.logger.debug('此邮箱可能并未注册!')
            elif not flask_bcrypt.check_password_hash(
                user.password,
                request.form['password'],
            ):
                error_message = '登录密码不正确'
                current_app.logger.debug('登录密码不正确!')
            elif (user.expire_t.date() - datetime.date.today()).days < 0:
                error_message = '账户已过期'
                current_app.logger.debug('账户已过期!')
            else:
                if login_user(user, remember=True):
                    current_app.logger.debug('登录成功!')
                    return redirect('/userGameStatuses')
                else:
                    error_message = '登录失败'
                    current_app.logger.debug('登录失败!')
    return render_template('/auth/login.html', error_message=error_message)


@app.route('/logout')
def logout():
    logout_user()
    current_app.logger.debug('登出！')
    return redirect('/login')


@app.route('/register', methods=['GET', 'POST'])
def register():
    register_form = forms.SignupForm(request.form)
    current_app.logger.debug(request.form)
    error_message = ''
    if request.method == 'POST':
        if not register_form.validate():
            current_app.logger.debug(register_form.errors)
            error_message = '密码不一致'
            current_app.logger.debug('密码不一致!')
        else:
            #if not recaptchaCheck(request.form['g-recaptcha-response']):
                #return '请点击人机身份验证!'
            # Prepare User with register info from form
            access_code_obj = AccessCode.from_access_code(
                request.form['access_code'],
            )
            if access_code_obj is None:
                error_message = '邀请码不正确'
                current_app.logger.debug('邀请码不正确!')
                current_app.logger.debug('wrong access code!')
            else:
                # If we get access code correctly
                reg_timestamp = datetime.datetime.now()
                user = User(
                    user_id=str(uuid.uuid4()),  # generate unique user id
                    email=request.form['email'],
                    username=request.form['username'],
                    password=flask_bcrypt.generate_password_hash(
                        request.form['password'],
                    ),
                    role=access_code_obj.role,
                    register_t=reg_timestamp,
                    expire_t=reg_timestamp + datetime.timedelta(
                        days=access_code_obj.expiration,
                    ),
                    last_active_t=reg_timestamp,
                )
                current_app.logger.debug('Try to save and login!')
                #try:
                user.save_register()
                current_app.logger.debug('Save new user completed!')
                if login_user(user, remember=True):
                    current_app.logger.debug('Login successful!')
                    current_app.logger.debug('user %s' % user.user_id)
                    return redirect('/userGameStatuses')
                else:
                    error_message = '登录失败'
                    current_app.logger.debug('Login successful!')
                    current_app.logger.debug('登录失败!')
            #except:
            #    current_app.logger.error(
            #        'Error on Registration - possible duplicate emails.'
            #    )

    # Prepare registration form
    template_data = {'form': register_form, 'error_message': error_message}
    return render_template('/auth/register.html', **template_data)


# Route for game
@app.route('/game', methods=['GET'])
@login_required
def game():
    return render_template('/index.html')


# Gets user game statuses for all the games own by the user
@app.route('/userGameStatuses', methods=['GET'])
@login_required
def getUserGameStatuses():
    if request.method == 'GET':
        doc = User(user_id=current_user.user_id).get_user_doc()
        game_status = json.loads(doc.game_status)
        profile = {}
        profile['teacher'] = (doc.role in ('a', 'm'))
        profile['admin'] = (doc.role == 'a')
        profile['games'] = game_status
        current_app.logger.debug('user game status:')
        current_app.logger.debug(profile)
        return render_template('/auth/gamestatuses.html', Profile=profile)
    return render_template(
        '/auth/internalerror.html',
        msg='User Id Missing in Request Arguments.',
    )


# Gets student game statuses for a teacher
@app.route('/studentGameStatuses', methods=['GET', 'POST'])
@login_required
def getStudentGameStatuses():
    #try:
    students = []
    for user in User.get_users_by_mentor(current_user.username):
        students.append({
            'name': user.username,
            'games': json.loads(user.game_status),
        })
    return render_template(
        '/auth/student_game_statuses.html',
        Students=students,
    )
    #except:
    #    render_template('/auth/internalerror.html', msg='No student found.')


# Update task status for user for game
@app.route('/updateTaskStatusByUserIdByGameIdByTaskId', methods=['POST'])
@login_required
def updateTaskStatusByUserIdByGameIdByTaskId():
    if request.method == 'POST':
        data = request.json
        current_app.logger.debug('get data from frontend.')
        current_app.logger.debug(data)
        doc = User(user_id=current_user.user_id).get_user_doc()
        if 'gameid' in data and 'taskid' in data and 'status' in data and doc:
            game_status = json.loads(doc.game_status)
            # update user game status
            game_status[data['gameid']]['tasks'][data['taskid']]['status'] = data['status']
            game_status = json.dumps(game_status)
            current_app.logger.debug('update game status.')
            current_app.logger.debug(game_status)
            try:
                status = User.set_game_status(current_user.user_id, game_status)
                status &=User.set_last_active_time(current_user.user_id)
                if not status:
                    current_app.logger.debug('update db for game status complete.')
                else:
                    current_app.logger.debug('update db for game status failed.')
            except:
                current_app.logger.debug('db transaction failed')

    else:
        return render_template(
            '/auth/internalerror.html',
            msg='Invalid request arguments.',
        )


# Update task status for user for game
@app.route('/assignMentor', methods=['POST'])
@login_required
def assignMentor():
    if request.method == 'POST':
        data = request.json
        current_app.logger.debug(data)
        if 'mentor' in data:
            User.set_mentor(data['mentor'])
    else:
        return render_template(
            '/auth/internalerror.html',
            msg='Invalid request arguments.',
        )


# Add admin page route `\admin`.
admin.add_view(AdminModelView(models.User))
admin.add_view(AdminModelView(models.AccessCode))
