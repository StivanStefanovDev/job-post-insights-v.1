import sys
import os
from flask_cors import CORS

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from model.model import get_analytics

from flask import Flask, jsonify

app = Flask(__name__)
CORS(app)

@app.route("/api/analytics", methods=["GET"])
def analytics():
    response = get_analytics()
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
