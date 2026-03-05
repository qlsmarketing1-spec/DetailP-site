# Use Node.js 23 for native TypeScript support
FROM node:23-slim

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the frontend
RUN npm run build

# Expose the port (Platform defaults to 3000)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
