# Start building python application
FROM python:3.10-slim AS run

# Load libraries
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy API application and static JavaScript contents
COPY *.py .

EXPOSE 5000

# Finally runs the application
CMD [ "python", "-m", "flask", "--app", "main.py", "run", "--host", "0.0.0.0"]

