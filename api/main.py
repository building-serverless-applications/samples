from flask import Flask, send_file, send_from_directory

app = Flask(__name__)


@app.route("/")
def serve_root():
    return send_file("static/index.html")


@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory("static", path)
