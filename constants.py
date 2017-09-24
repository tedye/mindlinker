# -*- coding: utf-8 -*-
# Default task map
DEFAULT_KNIGHT_TASKS = [
    {'name': '第一关', 'status': False},
    {'name': '第二关', 'status': False},
    {'name': '第三关', 'status': False},
    {'name': '第四关', 'status': False},
    {'name': '第五关', 'status': False},
    {'name': '第六关', 'status': False},
    {'name': '第七关', 'status': False},
    {'name': '第八关', 'status': False},
    {'name': '第九关', 'status': False},
    {'name': '第十关', 'status': False}
]
DEFAULT_PRINCESS_TASKS = [
    {'name': '第一关', 'status': False},
    {'name': '第二关', 'status': False},
    {'name': '第三关', 'status': False},
    {'name': '第四关', 'status': False},
    {'name': '第五关', 'status': False},
    {'name': '第六关', 'status': False},
    {'name': '第七关', 'status': False},
    {'name': '第八关', 'status': False},
    {'name': '第九关', 'status': False},
    {'name': '第十关', 'status': False}
]
# Default game status map
DEFAULT_GAME_MAP = [
    {
        'name': '骑士的故事',
        'tasks': DEFAULT_KNIGHT_TASKS,
    },
    {
        'name': '公主的故事',
        'tasks': DEFAULT_PRINCESS_TASKS,
    },
]
# Default role list
ROLES = (
    ('s', 'student'),
    ('m', 'mentor'),
    ('a', 'admin'),
)
