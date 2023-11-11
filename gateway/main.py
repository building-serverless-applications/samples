from flask import Flask
from urllib import request

app = Flask(__name__, static_folder=None)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def route_to_static(path):
    resp = request.urlopen(f"http://static-app.default.svc/{path}")
    return (resp.read(), resp.status, resp.getheaders())


@app.route("/my/dashboard")
def route_to_api():
    resp = request.urlopen("http://api-app.default.svc/my/dashboard")
    return (resp.read(), resp.status, resp.getheaders())
