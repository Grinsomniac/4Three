from flask import Flask, jsonify, make_response, request
import aws_controller
from flask_cors import CORS

app = Flask(__name__)

# Apply CORS to the app
CORS(app, supports_credentials=True, resources={r"/get_data": {"origins": "http://localhost:3000"}})

@app.route('/')
def index():
    return "This is the main page."

@app.route('/get_data', methods=["GET"])
def get_data():
    # Print debugging to check the request and response
    print("Received GET request on /get_data")
    response_data = aws_controller.get_items()
    response = jsonify(response_data)
    print("Response data:", response_data)
    
    return response

if __name__ == '__main__':
    app.run(port=5000)
