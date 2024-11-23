from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Default websites (cannot be removed)
default_websites = ["http://localhost:5173/", "chrome://extensions/"]
user_websites = []

@app.route('/get_websites', methods=['GET'])
def get_websites():
    # Combine default and user-added websites
    return jsonify({'websites': default_websites + user_websites})

@app.route('/add_website', methods=['POST'])
def add_website():
    data = request.json
    url = data.get('url')
    if url and url not in (default_websites + user_websites):
        user_websites.append(url)
        return jsonify({'message': 'Website added!', 'websites': default_websites + user_websites})
    return jsonify({'error': 'URL is required or already exists'}), 400

@app.route('/remove_website', methods=['POST'])
def remove_website():
    data = request.json
    url = data.get('url')
    if url in user_websites:
        user_websites.remove(url)
        return jsonify({'message': 'Website removed!', 'websites': default_websites + user_websites})
    return jsonify({'error': 'URL not found or cannot be removed'}), 400

if __name__ == '__main__':
    app.run(debug=True)
