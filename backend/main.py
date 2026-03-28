import os
import json
import random

import nltk
import numpy as np

import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset


ERROR_THRESHOLD = 0.7


class ChatbotModel(nn.Module):

    def __init__(self, input_size, output_size):
        super(ChatbotModel, self).__init__()
        self.fc1 = nn.Linear(input_size, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, output_size)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.5)

        def forward(self, x):
            x = self.relu(self.fc1(x))
            x = self.dropout(x)

            self.fc1 = nn.Linear(input_size, 128)
            self.fc2 = nn.Linear(128, 64)
            self.fc3 = nn.Linear(64, output_size)
            self.relu = nn.ReLU()
            self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)

        return x


class ChatbotAssistant:

    def __init__(self, intents_path, function_mappings = None):
        self.model = None
        self.intents_path = intents_path

        self.documents = []
        self.vocabulary = []
        self.intents = []
        self.intents_responses = {}

        self.function_mappings = function_mappings

        self.X = None
        self.y = None

    @staticmethod
    def tokenize_and_lemmatize(text):
        lemmatizer = nltk.WordNetLemmatizer()

        words = nltk.word_tokenize(text)
        words = [lemmatizer.lemmatize(word.lower()) for word in words]

        return words

    def bag_of_words(self, words):
        return [1 if word in words else 0 for word in self.vocabulary]

    def parse_intents(self):
        lemmatizer = nltk.WordNetLemmatizer()

        if os.path.exists(self.intents_path):
            with open(self.intents_path, 'r') as f:
                intents_data = json.load(f)

            for intent in intents_data['intents']:
                if intent['tag'] not in self.intents:
                    self.intents.append(intent['tag'])
                    self.intents_responses[intent['tag']] = intent['responses']

                for pattern in intent['patterns']:
                    pattern_words = self.tokenize_and_lemmatize(pattern)
                    self.vocabulary.extend(pattern_words)
                    self.documents.append((pattern_words, intent['tag']))

                self.vocabulary = sorted(set(self.vocabulary))

    def prepare_data(self):
        bags = []
        indices = []

        for document in self.documents:
            words = document[0]
            bag = self.bag_of_words(words)

            intent_index = self.intents.index(document[1])

            bags.append(bag)
            indices.append(intent_index)

        self.X = np.array(bags)
        self.y = np.array(indices)

    def train_model(self, batch_size, lr, epochs):
        X_tensor = torch.tensor(self.X, dtype=torch.float32)
        y_tensor = torch.tensor(self.y, dtype=torch.long)

        dataset = TensorDataset(X_tensor, y_tensor)
        loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

        self.model = ChatbotModel(self.X.shape[1], len(self.intents)) 

        criterion = nn.CrossEntropyLoss()
        optimizer = optim.Adam(self.model.parameters(), lr=lr)

        for epoch in range(epochs):
            running_loss = 0.0

            for batch_X, batch_y in loader:
                optimizer.zero_grad()
                outputs = self.model(batch_X)
                loss = criterion(outputs, batch_y)
                loss.backward()
                optimizer.step()
                running_loss += loss
            
            print(f"Epoch {epoch+1}: Loss: {running_loss / len(loader):.4f}")


    def save_model(self, model_path, dimensions_path, metadata_path="metadata.json"):
        torch.save(self.model.state_dict(), model_path)

        with open(dimensions_path, 'w') as f:
            json.dump({ 'input_size': self.X.shape[1], 'output_size': len(self.intents) }, f)

        # Save vocabulary, intents, and responses for later loading
        with open(metadata_path, "w") as f:
            json.dump({
                "vocabulary": self.vocabulary,
                "intents": self.intents,
                "responses": self.intents_responses
            }, f)


    def load_model(self, model_path, dimensions_path, metadata_path="metadata.json"):
        with open(dimensions_path, 'r') as f:
            dimensions = json.load(f)

        self.model = ChatbotModel(dimensions['input_size'], dimensions['output_size'])
        self.model.load_state_dict(torch.load(model_path, weights_only=True))

        # Load vocabulary, intents, and responses
        if os.path.exists(metadata_path):
            with open(metadata_path, "r") as f:
                data = json.load(f)
                self.vocabulary = data.get("vocabulary", [])
                self.intents = data.get("intents", [])
                self.intents_responses = data.get("responses", {})


    def process_message(self, input_message):
        words = self.tokenize_and_lemmatize(input_message)
        bag = self.bag_of_words(words)

        bag_tensor = torch.tensor([bag], dtype=torch.float32)

        self.model.eval()
        with torch.no_grad():
            predictions = self.model(bag_tensor)
            probs = F.softmax(predictions, dim=1)
            best_prob, predicted_index = torch.max(probs, dim=1)

        if best_prob.item() < ERROR_THRESHOLD:
            predicted_intent = "fallback"
        else:
            predicted_intent = self.intents[predicted_index.item()]

        matched_responses = self.intents_responses.get(predicted_intent)
        if not matched_responses:
            predicted_intent = "fallback"
            matched_responses = self.intents_responses.get("fallback")

        if predicted_intent != "fallback" and self.function_mappings and predicted_intent in self.function_mappings:
            self.function_mappings[predicted_intent]()

        if matched_responses:
            return random.choice(matched_responses)

        return "Hmm, I’m not sure about that. Try asking something else!"


def ensure_nltk_data():
    """Download required NLTK resources if missing (non-blocking on failure)."""
    resources = {
        "punkt": "tokenizers/punkt",
        "punkt_tab": "tokenizers/punkt_tab",
        "wordnet": "corpora/wordnet",
        # omw-1.4 is optional; skip if unavailable to avoid long downloads in restricted networks
    }

    for res, path in resources.items():
        try:
            nltk.data.find(path)
        except LookupError:
            try:
                nltk.download(res, quiet=True)
            except Exception as exc:
                print(f"Warning: could not download {res}: {exc}")


def train_and_save(model_path, dimensions_path, metadata_path, batch_size=8, lr=0.001, epochs=100):
    ensure_nltk_data()

    assistant = ChatbotAssistant('intents.json', function_mappings={'stocks': get_stocks})
    assistant.parse_intents()
    assistant.prepare_data()
    assistant.train_model(batch_size=batch_size, lr=lr, epochs=epochs)
    assistant.save_model(model_path, dimensions_path, metadata_path)

    return assistant


def get_stocks():
    stocks = ['APPL', 'META', 'NVDA', 'GS', 'MSFT']

    print(random.sample(stocks, 3))


if __name__ == '__main__':
    if os.getenv("TRAIN") == "1":
        train_and_save('chatbot_model.pth', 'dimensions.json', 'metadata.json', batch_size=8, lr=0.001, epochs=100)
    else:
        ensure_nltk_data()

        assistant = ChatbotAssistant('intents.json', function_mappings={'stocks': get_stocks})
        assistant.parse_intents()
        assistant.load_model('chatbot_model.pth', 'dimensions.json', 'metadata.json')

        while True:
            message = input('Enter your message:')

            if message == '/quit':
                break

            print(assistant.process_message(message))