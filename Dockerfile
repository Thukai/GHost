# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy app files
COPY . .

# Expose the port
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]
