#/Dockerfile

# use official node image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pakcage-locl.json files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the entire backend code to the container
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ['node', 'server.js']