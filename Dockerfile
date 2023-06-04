# Use the official Node.js 18 Alpine image as the base image
FROM node:18-alpine

# Set the NODE_ENV environment variable to production
ENV NODE_ENV=production

# Create a directory for the application within the container
RUN mkdir -p /usr/src/app

# Set the working directory for subsequent commands
WORKDIR /usr/src/app

# Copy the package.json file to the working directory
COPY package.json /usr/src/app/

# Install the application dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY . /usr/src/app

# Expose port 3000 for the application
EXPOSE 3000

# Specify the command to run when the container starts
CMD [ "npm", "start" ]