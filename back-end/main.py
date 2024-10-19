import firebase_admin
from firebase_admin import credentials, auth
from flask import Flask, request, jsonify

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)

@app.route("/")
def standard():
    return "This is a test response"

@app.route('/verify-token', methods=['POST'])
def verify_token():
    id_token = request.json.get('idToken')
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return jsonify({'message': 'Token is valid', 'uid': uid}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 401
