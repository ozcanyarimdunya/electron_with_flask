import os
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/')
@app.route('/<string:name>/')
def index(name=None):
    data = {
        'message': 'Hello, {}'.format(name)
    }
    return jsonify(data)


@app.route('/pid/')
def pid():
    data = {
        'pid': int(os.getpid())
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run()
