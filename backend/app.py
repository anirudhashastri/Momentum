from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Store the list of allowed websites
allowed_websites = ["http://localhost:5173/",
                    "chrome://extensions/"]

@app.route('/add_website', methods=['POST'])
def add_website():
    data = request.json
    url = data.get('url')
    if url and url not in allowed_websites:
        allowed_websites.append(url)
        print(f"Website added: {url}")  # Debugging log
        socketio.emit('update', {'websites': allowed_websites})  # Broadcast update
        return jsonify({'message': 'Website added!', 'websites': allowed_websites})
    return jsonify({'error': 'URL is required or already exists'}), 400

@app.route('/get_websites', methods=['GET'])
def get_websites():
    return jsonify({'websites': allowed_websites})

@app.route('/websocket')
def websocket():
    return jsonify({'message': 'WebSocket endpoint active'})

if __name__ == '__main__':
    socketio.run(app, debug=True)
