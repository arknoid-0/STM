from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend to access backend

# MongoDB connection setup
# Replace this with your MongoDB connection string
MONGO_URI = os.getenv('MONGO_URI', 'mongodb+srv://devarkayswami:9qfn7pFh1uQCHM37@cluster0.efjte.mongodb.net/')
client = MongoClient(MONGO_URI)
db = client['stm']  # Replace with your database name
collection = db['temperature']  # Replace with your collection name

@app.route('/get-sensor-data', methods=['GET'])
def get_sensor_data():
    try:
        # Fetch all sensor data from the collection (no limit, or limit to 100 most recent records)
        data = collection.find().sort('timestamp',-1).limit(100)
  # Sort by timestamp in descending order (most recent first)
        
        # If you want to limit to the latest 100 records, use this:
        # data = collection.find().sort('timestamp', -1).limit(100)

        # Prepare the data to send as JSON
        sensor_data = [{'timestamp': record['timestamp'], 'temperature': record['temperature']} for record in data]
        
        # Return the data as JSON
        return jsonify(sensor_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-collections', methods=['GET'])
def get_collections():
    try:
        # Get a list of collection names from MongoDB
        collections = db.list_collection_names()
        return jsonify(collections)  # Return the list of collections as JSON
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/get-data/<collection_name>', methods=['GET'])
def get_data(collection_name):
    try:
        # Fetch data from the specified collection
        collection = db[collection_name]
        data = collection.find().sort('timestamp', -1)  # Sort by timestamp
        sensor_data = [{'timestamp': record['timestamp'], 'temperature': record['temperature']} for record in data]
        return jsonify(sensor_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Run Flask app on localhost, port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
