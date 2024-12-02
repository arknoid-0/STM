from flask import Flask, jsonify, send_from_directory
from pymongo import MongoClient
import os
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder='../frontend')  # Set frontend folder for static files
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS to allow frontend access


# MongoDB connection setup
# Replace with your MongoDB connection string (using mongodb:// if not using SRV)
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://devarkayswami:9qfn7pFh1uQCHM37@localhost:27017/')
client = MongoClient(MONGO_URI)
db = client['stm']  # Replace with your database name
collection = db['temperature']  # Replace with your collection name


@app.route('/')
def serve_index():
    # Serve the main HTML file (index.html)
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    # Serve static files like JS and CSS
    return send_from_directory(app.static_folder, path)

@app.route('/get-sensor-data', methods=['GET'])
def get_sensor_data():
    try:
        # Fetch all sensor data from the collection (most recent 100 records)
        data = collection.find().sort('timestamp', -1).limit(100)
        
        # Prepare the data to send as JSON
        sensor_data = [{'timestamp': record.get('timestamp'), 'temperature': record.get('temperature')} for record in data]
        
        # Return the data as JSON
        return jsonify(sensor_data)
    except Exception as e:
        # Log error details
        app.logger.error(f"Error occurred: {e}")
        return jsonify({"error": "An internal error occurred while fetching sensor data."}), 500

if __name__ == '__main__':
    # Run Flask app on localhost, port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
