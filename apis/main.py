from flask import Flask, jsonify
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

dbConfig = {
    'host': 'localhost',
    'user': 'root',
    'password': 'juan1',
    'database': 'juegoedvs'
}

def connection():
    return pymysql.connect(**dbConfig)

@app.route("/api/preguntas/<id>", methods=["GET"])
def obtenerPreguntas(id):
    conn = connection()
    query = f"Select pregunta, a, b, c, respuesta From juegoedvs.preguntas where (id = {id});"
    try:
        with conn.cursor() as cursor:
            cursor.execute(query)
            data = cursor.fetchall()
    finally:
        conn.close()
    return jsonify(data)

@app.route("/api/preguntas/ids", methods=["GET"])
def obtenerIds():
    conn = connection()
    query = "Select id From juegoedvs.preguntas;"
    try:
        with conn.cursor() as cursor:
            cursor.execute(query)
            data = cursor.fetchall()
    finally:
        conn.close()
    return jsonify(data)    

if __name__ == "__main__":
    app.run(port=5001)