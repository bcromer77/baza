# Base image with Node.js and Python
FROM node:18-bullseye as base

# Install Python and ffmpeg
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg && \
    pip3 install --upgrade pip

# Copy Python dependencies and install Whisper
COPY scripts/transcribe.py /app/scripts/transcribe.py
WORKDIR /app
RUN pip3 install openai-whisper

# Copy Node.js files
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment variables
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start the Node.js server
CMD ["node", "server/server.js"]

