// =========================
// Dashboard Variables
// =========================

let yieldHistory = [];

// Create Chart
const ctx = document.getElementById("yieldChart");

const chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Predicted Yield",
            data: [],
            borderWidth: 2,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// =========================
// Yield Prediction
// =========================

async function predictYield() {

    const data = {
        rainfall: Number(document.getElementById("rainfall").value),
        temperature: Number(document.getElementById("temperature").value),
        humidity: Number(document.getElementById("humidity").value),
        nitrogen: Number(document.getElementById("nitrogen").value),
        phosphorus: Number(document.getElementById("phosphorus").value),
        potassium: Number(document.getElementById("potassium").value)
    };

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/predict-yield",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        // Display Result
        document.getElementById("result").innerHTML =
            "Predicted Yield: " + result.predicted_yield;

        // Store Prediction
        yieldHistory.push(result.predicted_yield);

        // Update Counter
        document.getElementById("count").innerHTML =
            "Total Predictions: " + yieldHistory.length;

        // Update Chart
        chart.data.labels.push(
            "Prediction " + yieldHistory.length
        );

        chart.data.datasets[0].data.push(
            result.predicted_yield
        );

        chart.update();

    } catch (error) {

        console.error(error);

        alert(
            "Yield Prediction Failed. Check Flask Server."
        );
    }
}

// =========================
// Crop Recommendation
// =========================

async function recommendCrop() {

    const data = {
        N: Number(document.getElementById("N").value),
        P: Number(document.getElementById("P").value),
        K: Number(document.getElementById("K").value),
        temperature: Number(document.getElementById("temp_crop").value),
        humidity: Number(document.getElementById("humidity_crop").value),
        ph: Number(document.getElementById("ph").value),
        rainfall: Number(document.getElementById("rainfall_crop").value)
    };

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/recommend-crop",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        document.getElementById("cropResult").innerHTML =
            "Recommended Crop: " +
            result.recommended_crop;

    } catch (error) {

        console.error(error);

        alert(
            "Crop Recommendation Failed. Check Flask Server."
        );
    }
}