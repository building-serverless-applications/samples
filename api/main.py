from flask import Flask, send_file, send_from_directory
import noaa_sdk

app = Flask(__name__)


@app.route("/")
def serve_root():
    return send_file("static/index.html")


@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory("static", path)


noaa = noaa_sdk.NOAA()


def get_weather(zip):
    observations = noaa.get_observations(str(zip), "US")
    current_weather = next(observations)  # Just take the first for now

    content = current_weather["textDescription"]
    image = {'url': current_weather["icon"], 'alt': content}
    if current_weather.get("temperature", {}).get("value", 0):
        unit = current_weather["temperature"]["unitCode"][-1]
        content += f': {current_weather["temperature"]["value"]} {unit}'
    return dict(title=f"Weather at {zip}", content=content, image=image)


@app.route("/my/dashboard")
def serve_dashboard():
    # Flask will convert dicts and arrays to JSON automatically.
    return {"items": [get_weather(96813)]}
