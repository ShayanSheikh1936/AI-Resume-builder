# -----------------------------
# Stage 1: Build the React app
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Vite public env vars are injected at build time
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Install dependencies first (better Docker cache usage)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---------------------------------
# Stage 2: Run with static web server
# ---------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy only built assets from builder stage
COPY --from=builder /app/dist ./dist

# Cloud Run provides PORT at runtime (default 8080)
ENV PORT=8080
EXPOSE 8080

# Start server and bind to Cloud Run port
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT}"]
