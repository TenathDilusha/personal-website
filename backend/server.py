from flask import Flask, request, jsonify
from flask_cors import CORS
from main import ChatbotAssistant, get_stocks, ensure_nltk_data
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)
CORS(app)


def build_path(name):
    return os.path.join(BASE_DIR, name)


ensure_nltk_data()
assistant = ChatbotAssistant(build_path('intents.json'), function_mappings={'stocks': get_stocks})
assistant.parse_intents()
assistant.load_model(build_path('chatbot_model.pth'), build_path('dimensions.json'), build_path('metadata.json'))


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    message = data.get('message', '')
    try:
        reply = assistant.process_message(message) or "Hmm, I’m not sure about that. Try asking something else!"
    except Exception as exc:  # keep the API responsive even on errors
        print(f"Error processing message: {exc}")
        reply = "⚠️ Error processing your message."
    return jsonify({'reply': reply})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
