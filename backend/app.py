from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq # Replace with actual Groq Python SDK if available
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Default websites (cannot be removed)
default_websites = ["http://localhost:5173/", "chrome://extensions/"]
user_websites = []

# Example: Set up Groq API key 
# Load .env file
load_dotenv()

# Create a Groq client instance
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


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

# Conversational Assistant Endpoint
@app.route('/assistant', methods=['POST'])
def assistant():
    data = request.json
    query = data.get('query')

    if not query:
        return jsonify({'error': 'Query is required'}), 400

    try:
        # Make a chat completion request to Groq API
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": query
                }
            ],
            model="llama3-70b-8192",  # Meta's LLaMA 3 70B model
        )

        # Extract and return the generated response
        response_text = chat_completion.choices[0].message.content
        return jsonify({'response': response_text})
    except Exception as e:
        print(f"Error processing assistant request: {e}")
        return jsonify({'error': 'An error occurred while processing your query'}), 500

if __name__ == '__main__':
    app.run(debug=True)
