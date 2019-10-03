build-flask:
	cd flask && pyinstaller --onefile --windowed app.py

build-electron:
	cd electron && npm run dist

build: build-flask build-electron

run-packaged:
	./electron/dist/linux-unpacked/electron-ui

install:
	pip install -r flask/requirements.txt
	cd electron && npm i

run:
	python flask/app.py & cd electron && npm start
