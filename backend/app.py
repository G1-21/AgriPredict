from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import mysql.connector
import requests

def get_db_connection():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="root1234",
        database="agricrop",
        autocommit=True
    )

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

    db = get_db_connection()
    cursor = db.cursor()

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

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        """
        UPDATE prediction_history
        SET recommended_crop = %s
        WHERE id = (
            SELECT id
            FROM (
                SELECT MAX(id) AS id
                FROM prediction_history
            ) temp
        )
        """,
        (crop[0],)
        )

    db.commit()

    return jsonify({
        "recommended_crop": crop[0]
    })

@app.route("/history")
def history():

    db = get_db_connection()
    cursor = db.cursor()
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

@app.route("/analytics")
def analytics():

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("""
        SELECT
            DATE_FORMAT(created_at, '%Y-%m') AS month_key,
            DATE_FORMAT(MIN(created_at), '%b %Y') AS month,
            ROUND(AVG(predicted_yield), 2) AS avg_yield,
            COUNT(predicted_yield) AS total_predictions,
            ROUND(MAX(predicted_yield), 2) AS highest_yield,
            ROUND(MIN(predicted_yield), 2) AS lowest_yield
        FROM prediction_history
        WHERE predicted_yield IS NOT NULL
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY month_key
    """)

    rows = cursor.fetchall()

    previous = []

    for row in rows:
        previous.append({
            "month_key": row[0],
            "month": row[1],
            "yield": float(row[2]),
            "total_predictions": int(row[3]),
            "highest_yield": float(row[4]),
            "lowest_yield": float(row[5])
        })

    # -------------------------
    # Top Crop for Each Month
    # -------------------------

    cursor.execute("""
        SELECT
            DATE_FORMAT(created_at, '%Y-%m') AS month_key,
            recommended_crop,
            COUNT(*) AS crop_count
        FROM prediction_history
        WHERE recommended_crop IS NOT NULL
        AND created_at >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY
            DATE_FORMAT(created_at, '%Y-%m'),
            recommended_crop
        ORDER BY
            month_key,
            crop_count DESC
    """)

    crop_rows = cursor.fetchall()

    top_crops = {}

    for row in crop_rows:

        month_key = row[0]
        crop_name = row[1]

        # Keep only the first crop for each month.
        # The SQL result is already sorted by highest count.
        if month_key not in top_crops:
            top_crops[month_key] = crop_name

    for item in previous:

        item["top_crop"] = top_crops.get(
            item["month_key"],
            "N/A"
        )

    # -------------------------
    # Current Analytics
    # -------------------------

    cursor.execute("""
    SELECT
        predicted_yield,
        recommended_crop,
        created_at
    FROM prediction_history
    ORDER BY id DESC
    LIMIT 1
    """)

    row = cursor.fetchone()

    current = {}

    if row:

        current = {

            "yield": float(row[0]) if row[0] else 0,

            "crop": row[1] if row[1] else "N/A",

            "date": str(row[2])

        }

    # -------------------------
    # Current Month Graph
    # -------------------------

    cursor.execute("""
        SELECT
            DATE_FORMAT(created_at, '%d %b') AS day,
            predicted_yield,
            DATE_FORMAT(created_at, '%h:%i %p') AS prediction_time
        FROM prediction_history
        WHERE predicted_yield IS NOT NULL
        AND MONTH(created_at) = MONTH(CURDATE())
        AND YEAR(created_at) = YEAR(CURDATE())
        ORDER BY created_at
        """)

    rows = cursor.fetchall()

    current_graph = []

    for row in rows:

        current_graph.append({
            "day": row[0],
            "yield": float(row[1]),
            "time": row[2]
        })

    # -------------------------
    # Future 6 Months Forecast
    # -------------------------

    from datetime import datetime

    future = []

    if len(previous) >= 2:

        total_growth = 0

        for i in range(1, len(previous)):

            total_growth += (
                previous[i]["yield"] -
                previous[i - 1]["yield"]
            )

        avg_growth = total_growth / (len(previous) - 1)

        last_yield = previous[-1]["yield"]

        # Get the last historical month
        last_month_date = datetime.strptime(
            previous[-1]["month_key"],
            "%Y-%m"
        )

        for i in range(1, 7):

            last_yield += avg_growth

            # Calculate the next month
            month_number = last_month_date.month + i
            year = last_month_date.year

            while month_number > 12:
                month_number -= 12
                year += 1

            month_name = datetime(
                year,
                month_number,
                1
            ).strftime("%b %Y")

            future.append({
                "month": month_name,
                "yield": round(last_yield, 2)
            })


    return jsonify({

        "previous": previous,

        "current": current,

        "current_graph": current_graph,

        "future": future

    })


@app.route("/analytics-summary")
def analytics_summary():

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute("""
        SELECT
            ROUND(AVG(predicted_yield),2),
            ROUND(MAX(predicted_yield),2),
            ROUND(MIN(predicted_yield),2),
            COUNT(*)
        FROM prediction_history
        WHERE predicted_yield IS NOT NULL
    """)

    result = cursor.fetchone()

    cursor.execute("""
        SELECT recommended_crop,
               COUNT(*) as total
        FROM prediction_history
        WHERE recommended_crop IS NOT NULL
        GROUP BY recommended_crop
        ORDER BY total DESC
        LIMIT 1
    """)

    crop = cursor.fetchone()

    return jsonify({
        "average": result[0] or 0,
        "highest": result[1] or 0,
        "lowest": result[2] or 0,
        "count": result[3] or 0,
        "most_crop": crop[0] if crop else "N/A",
        "crop_count": crop[1] if crop else 0
    })


@app.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data["name"]
    email = data["email"]
    password = data["password"]

    db = get_db_connection()
    cursor = db.cursor()

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

    db = get_db_connection()
    cursor = db.cursor()

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

@app.route("/dashboard-stats", methods=["GET"])
def dashboard_stats():

    db = get_db_connection()
    cursor = db.cursor()

    # Total Predictions
    cursor.execute("""
        SELECT COUNT(*)
        FROM prediction_history
    """)

    total_predictions = cursor.fetchone()[0]

    # Total Users
    cursor.execute("""
        SELECT COUNT(*)
        FROM users
    """)

    total_users = cursor.fetchone()[0]

    # Total Crop Recommendations
    cursor.execute("""
        SELECT COUNT(*)
        FROM prediction_history
        WHERE recommended_crop IS NOT NULL
    """)

    recommended_crops = cursor.fetchone()[0]

    # Most Recommended Crop
    cursor.execute("""
        SELECT recommended_crop,
               COUNT(*) AS total
        FROM prediction_history
        WHERE recommended_crop IS NOT NULL
        GROUP BY recommended_crop
        ORDER BY total DESC
        LIMIT 1
    """)

    crop = cursor.fetchone()

    top_crop = crop[0] if crop else "N/A"

    return jsonify({
        "total_predictions": total_predictions,
        "total_users": total_users,
        "recommended_crops": recommended_crops,
        "top_crop": top_crop,
        "model_accuracy": 92
    })

@app.route("/delete-history/<int:id>", methods=["DELETE"])
def delete_history(id):

    db = get_db_connection()
    cursor = db.cursor()

    cursor.execute(
        """
        DELETE FROM prediction_history
        WHERE id = %s
        """,
        (id,)
    )

    db.commit()

    return jsonify({
        "message": "Deleted Successfully"
    })

@app.route("/weather/<city>")
def get_weather(city):

    db = get_db_connection()
    cursor = db.cursor()

    api_key = "76b678976d3ca914a2ca7d58a677186e"

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}"
        f"&appid={api_key}"
        f"&units=metric"
    )

    response = requests.get(url)

    data = response.json()

    if response.status_code != 200:

        return jsonify({
            "error": "City not found"
        })

    rainfall = 0

    if "rain" in data:

        rainfall = (
            data["rain"].get("1h", 0)
            or
            data["rain"].get("3h", 0)
        )

    return jsonify({

        "temperature":
            data["main"]["temp"],

        "humidity":
            data["main"]["humidity"],

        "rainfall":
            rainfall,

        "condition":
            data["weather"][0]["main"]

    })

if __name__ == "__main__":
    app.run(debug=True)