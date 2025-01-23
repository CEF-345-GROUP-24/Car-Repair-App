# Use official Node.js image to build the backend
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend app code
COPY . .

# Expose port 5000 (or the port your backend runs on)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
