from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store the list of allowed websites
allowed_websites = ["http://localhost:5173/"]

@app.route('/get_websites', methods=['GET'])
def get_websites():
    return jsonify({'websites': allowed_websites})

@app.route('/add_website', methods=['POST'])
def add_website():
    data = request.json
    url = data.get('url')
    if url and url not in allowed_websites:
        allowed_websites.append(url)
        return jsonify({'message': 'Website added!', 'websites': allowed_websites})
    return jsonify({'error': 'URL is required or already exists'}), 400

if __name__ == '__main__':
    app.run(debug=True)
