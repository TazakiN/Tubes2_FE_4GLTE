# Stage 1: Build the React app
FROM node:alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built React app with npm serve
FROM node:alpine

# Install serve globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy the built React app from the previous stage
COPY --from=build /app/build .

# Expose port 5000
EXPOSE 3000

# Command to serve the built React app
CMD ["serve", "-s", ".", "-l", "3000"]
