FROM node:20-alpine AS builder
WORKDIR /app

# Dependencies install karein
COPY package*.json ./
RUN npm ci

# Ab saara code copy karein
COPY . .

# IMPORTANT: Build se pehle key yahan lazmi honi chahiye
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Ab build run karein
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
ENV PORT=8080
EXPOSE 8080
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT}"]