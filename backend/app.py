from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root1234",
    database="agricrop"
)

cursor = db.cursor()

app = Flask(__name__)
CORS(app)

# Load trained models
yield_model = joblib.load("yield_model.pkl")
crop_model = joblib.load("crop_model.pkl")

@app.route("/")
def home():
    return "AgriPredict API Running"

# Yield Prediction API
@app.route("/predict-yield", methods=["POST"])
def predict_yield():

    data = request.json

    features = [[
        data["rainfall"],
        data["temperature"],
        data["humidity"],
        data["nitrogen"],
        data["phosphorus"],
        data["potassium"]
    ]]

    prediction = yield_model.predict(features)

    cursor.execute(
    """
    INSERT INTO prediction_history
    (predicted_yield)
    VALUES (%s)
    """,
    (float(prediction[0]),)
    )

    db.commit()

    return jsonify({
        "predicted_yield": round(float(prediction[0]), 2)
    })

# Crop Recommendation API
@app.route("/recommend-crop", methods=["POST"])
def recommend_crop():

    data = request.json

    features = [[
        data["N"],
        data["P"],
        data["K"],
        data["temperature"],
        data["humidity"],
        data["ph"],
        data["rainfall"]
    ]]

    crop = crop_model.predict(features)

    cursor.execute(
    """
    UPDATE prediction_history
    SET recommended_crop = %s
    ORDER BY id DESC
    LIMIT 1
    """,
    (crop[0],)
    )

    db.commit()

    return jsonify({
        "recommended_crop": crop[0]
    })

@app.route("/history")
def history():

    cursor.execute("""
        SELECT *
        FROM prediction_history
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    data = []

    for row in rows:

        data.append({
            "id": row[0],
            "yield": row[1],
            "crop": row[2],
            "date": str(row[3])
        })

    return jsonify(data)

@app.route("/analytics", methods=["GET"])
def analytics():

    cursor.execute("""
        SELECT predicted_yield
        FROM prediction_history
        WHERE predicted_yield IS NOT NULL
        ORDER BY id
    """)

    rows = cursor.fetchall()

    yields = []

    for row in rows:
        yields.append(float(row[0]))

    return jsonify(yields)

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data["name"]
    email = data["email"]
    password = data["password"]

    cursor.execute(
        """
        INSERT INTO users
        (name,email,password)
        VALUES (%s,%s,%s)
        """,
        (name,email,password)
    )

    db.commit()

    return jsonify({
        "message":"User Registered"
    })

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE email=%s
        AND password=%s
        """,
        (email, password)
    )

    user = cursor.fetchone()

    if user:

        return jsonify({
            "success": True,
            "name": user[1]
        })

    return jsonify({
        "success": False
    })

if __name__ == "__main__":
    app.run(debug=True)