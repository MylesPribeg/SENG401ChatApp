# Use the official Node.js image as the base image
FROM node:16

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the required dependencies
RUN npm ci

# Copy the remaining source code to the working directory
COPY . .

# Copy .env file to the working directory
COPY .env ./

# Expose the port the backend server will run on
EXPOSE 8000

# Start the backend server
CMD ["npm", "start"]