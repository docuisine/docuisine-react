# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.ts ./
COPY tsconfig*.json ./
COPY src ./src
COPY public ./public

RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache gettext && \
    npm i -g serve@14.2.5

# Copy built artifacts from build stage
COPY --from=builder /app/dist ./dist

# Make environment variables be defined at runtime (dependency injection)
# Passing in these variables are required to run it, 
# otherwise build process will be a success but the app will crash on startup.
# Example:
#   -e APP_VERSION=dev \
#   -e BACKEND_URL=https://docuisine.vercel.app \
#   -e IMAGE_HOST=https://pub-d3ef28b83a854575bfa54225e768a452.r2.dev \
# Copy runtime environment files
COPY env.js .
COPY entrypoint.sh .

RUN chmod +x /app/entrypoint.sh

# Create a non-privileged user and set ownership
RUN addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser && \
    chown -R appuser:appuser /app

# Switch to non-privileged user
USER appuser

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["serve", "-s", "dist"]
