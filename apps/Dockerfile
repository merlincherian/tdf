# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Install Prisma CLI locally
RUN pnpm add prisma

# Ensure node_modules/.bin is in the PATH
ENV PATH=/app/node_modules/.bin:$PATH

# Copy the application source code to the working directory
COPY . .

# Generate Prisma client
RUN prisma generate

# Build the application
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3101

# Command to run the application
CMD ["node", "dist/main.js"]