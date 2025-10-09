# Use official Node.js runtime as base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 5001

# Start the backend
CMD ["npm", "start"]
