# syntax=docker/dockerfile:1
# ^ This line is required for the <<EOF syntax to work!

# Stage 1: Build the React app
FROM node:20-slim AS build-stage
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from Vite/React (usually 'dist' or 'build')
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Create the Nginx config specifically for Cloud Run's port (8080)
# We quote "EOF" so $uri doesn't get messed up
COPY <<-"EOF" /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
EOF

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]