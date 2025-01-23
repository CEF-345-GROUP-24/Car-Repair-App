# Step 1: Build the React app
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the app with a web server (e.g., Nginx or serve)
FROM nginx:alpine

# Copy the built React app to Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
