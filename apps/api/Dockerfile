# Use Alpine Linux as base image
FROM node:20-alpine

# Set working directory
WORKDIR /.

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Expose port
EXPOSE 3001

# Start the application
CMD ["pnpm", "dev"]
