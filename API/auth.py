from flask import Flask, jsonify, request
import jwt
import datetime

app = Flask(__name__)


app.config['SECRET_KEY'] = '<make your own key, can be anything>'

USERNAME = 'user'
PASSWORD = 'password'


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    provided_username = data.get('username')
    provided_password = data.get('password')

    if provided_username == USERNAME and provided_password == PASSWORD:
        token = jwt.encode({'user': provided_username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)},
                          app.config['SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')}), 200

    return jsonify({'error': 'Invalid username or password'}), 401


if __name__ == '__main__':
    app.run(debug=True)



# so you can run that app.py and it will start a server on like localhost:5000, it should say when you run it
# then in your frontend i think you can do something like so

const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username,
        password,
    }),
});