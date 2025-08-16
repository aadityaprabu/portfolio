# Use Node 20.19 on Alpine for smaller image
FROM node:20.19.0-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching in builds)
COPY app/package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the source code 
COPY app/. .

# Tell Coolify what port to expose
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
