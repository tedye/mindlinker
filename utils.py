# -*- coding: utf-8 -*-
import requests
from flask import current_app

from app import app
import models


# Google recaptcha check
def recaptchaCheck(token):
    payload = {
        'secret':'6LcmFDAUAAAAAKjJLxCR1FVCzZInYI63z_k_8hRI',
        'response': token,
    }
    res = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data=payload,
    )
    current_app.logger.debug(res.json())
    return res.json()['success']


def add_admin_access_code():
    """Check if access code for admin is in mongodb. Add current app secret key
    to AccessCode table is if it is not in the table yet.
    """
    admin_ac = app.config['SECRET_KEY']
    new_access_code_doc = models.AccessCode(
        access_code=admin_ac,
        role='a',  # admin role
        expiration=36500,  # init expiration to roughly 100 year!
    )
    new_access_code_doc.save()
    app.logger.debug('Added admin access code %s to db.' % admin_ac)
