.PHONY: local_python, local_npm, clean

local_python: requirements.txt
	rm -rf dist/ && npm run dev && python cachebusting.py && cp -r dist assets/
	virtualenv -ppython3.6 venv && source venv/bin/activate && pip install -r requirements.txt -i https://pypi.python.org/simple --no-cache && heroku local

local_python_kun: requirements_kun.txt
	rm -rf dist/ && npm run dev && python cachebusting.py && cp -r dist assets/
	virtualenv -ppython3.6 venv && source venv/bin/activate && pip install flask-mongoengine && pip install -r requirements.txt -i https://pypi.python.org/simple --no-cache && heroku local

clean:
	rm -rf venv/
	rm *.pyc
	rm -r assets/dist
