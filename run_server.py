# -*- coding: utf-8 -*-
import os

from app import app
from views import *
from utils import add_admin_access_code


if __name__ == '__main__':
    add_admin_access_code()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
