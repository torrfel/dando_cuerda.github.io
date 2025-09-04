from flask import Flask, jsonify, render_template
import pandas as pd

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/data")
def get_data():
    # Simulamos un DataFrame
    data = {
        "Categoria": ["A", "B", "C", "D"],
        "Ventas": [120, 80, 150, 100]
    }
    df = pd.DataFrame(data)
    return jsonify(df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)
