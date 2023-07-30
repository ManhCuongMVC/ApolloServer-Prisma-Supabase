# Stage 1: Build the TypeScript application
FROM node:20-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm typescript

# Set the working directory inside the container
WORKDIR /app

# Copy package.json, package-lock.json, and pnpm-lock.yaml to the container
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install app dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Compile TypeScript to JavaScript
RUN tsc

# Install only production dependencies
# RUN npm config set registry http://registry.npmjs.org/
RUN npm config get proxy
RUN npm config rm proxy
RUN npm config rm https-proxy

# Expose the port on which your Node.js app is running (change this if needed)
EXPOSE 5000

# Specify the command to run your Node.js app
CMD ["node", "./dist/app.js"]
