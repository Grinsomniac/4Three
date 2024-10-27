from flask import Flask, jsonify, make_response, request
import aws_controller
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/get-items": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return "This is the main page."
    
@app.route('/get_data')
def get_data():
    print(request)
    return jsonify(aws_controller.get_items())

if __name__ == '__main__':
    app.run(port=5000)