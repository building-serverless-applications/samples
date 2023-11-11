# Docker Image which is used as foundation to create
# a custom Docker Image with this Dockerfile
FROM node:18 AS package

# App is built here
WORKDIR /app

# Install dependencies first, so code changes build fast
COPY package*.json ./
RUN npm install

# Copies needed files
COPY src ./src/
COPY public ./public/
COPY tsconfig.json ./

RUN npm run-script build

# At this point, we have all the files needed to serve our UI

# Start building python application
FROM python:3.10-slim AS run

# Load libraries
COPY api/requirements.txt .
RUN pip install -r requirements.txt

# Copy API application and static JavaScript contents
COPY api .
COPY public ./static/
COPY --from=package /app/build/* ./static/

# Use the same port as express
EXPOSE 3000

# Finally runs the application
CMD [ "python", "-m", "flask", "--app", "main.py", "run", "--host", "0.0.0.0", "--port", "3000" ]

