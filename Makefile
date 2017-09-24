.PHONY: local_python, local_npm, clean

local_python: requirements.txt
	rm -rf dist/ && npm run dev && python cachebusting.py && cp -r dist assets/
	virtualenv -ppython3.6 venv && source venv/bin/activate && pip install -r requirements.txt && heroku local

clean:
	rm -rf venv/
	rm *.pyc
	rm -r assets/dist
