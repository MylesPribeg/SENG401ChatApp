# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /socket

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the required dependencies
RUN npm ci

# Copy the remaining source code to the working directory
COPY . .

# Expose the port the socket.io server will run on
EXPOSE 8001

# Set environment variables
ENV FRONTEND_URL "http://localhost:5173"
ENV BACKEND_URL "http://localhost:8000"
ENV PORT 8001

# Start the socket.io server
CMD ["node", "index.js"]
