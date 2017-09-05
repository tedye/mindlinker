.PHONY: local_python, local_npm, clean

local_python: requirements.txt
	cp -r dist assets/
	virtualenv venv && source venv/bin/activate && pip install -r requirements.txt && heroku local

local_npm:
	npm run dev

clean:
	rm -rf venv/
	rm *.pyc
	rm -r assets/dist
