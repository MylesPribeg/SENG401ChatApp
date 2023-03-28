# Step 1: Build the frontend React app with Vite
FROM node:14-alpine as build-stage

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY frontend/ ./

# Build the app
RUN npm run build

# Step 2: Serve the frontend app using serve
FROM node:14-alpine as production-stage

# Set the working directory
WORKDIR /frontend

# Install serve package globally
RUN npm install -g serve

# Copy the built app from the build-stage
COPY --from=build-stage /frontend/dist /frontend/dist

# Expose the port serve will listen on
EXPOSE 5000

# Start the server
CMD serve -s dist -l tcp://0.0.0.0:${PORT}