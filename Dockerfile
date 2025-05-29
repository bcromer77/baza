# Use official Node.js 18 base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Set environment variable for port
ENV PORT=8080

# Expose the port Cloud Run will listen on
EXPOSE 8080

# Start the app (adjust if needed to match your entry file)
CMD [ "node", "index.js" ]

