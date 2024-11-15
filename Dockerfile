# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Sveltekit application
RUN npm run build --verbose

# Run stage
FROM node:18-alpine

WORKDIR /app

# Copy built assets from the builder stage
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules

# Install only production dependencies
# RUN npm ci --only=production

# Expose the port on which app will run on
EXPOSE 3000

# Start the application with Node.js(for SSR)
CMD ["node","build"]
