# ---- Build stage ----
FROM node:20-alpine AS builder

# Enable pnpm via Corepack
RUN corepack enable

# Workspace root
WORKDIR /app

# --- Build arguments ---
ARG VITE_TMDB_API_KEY
ARG VITE_APP_BASE_URL
ARG VITE_APP_ACCESS_TOKEN
ARG VITE_APP_IMAGE_URL_ORIGINAL
ARG VITE_APP_IMAGE_URL_WIDTH50

# --- Expose them to build environment ---
ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY
ENV VITE_APP_BASE_URL=$VITE_APP_BASE_URL
ENV VITE_APP_ACCESS_TOKEN=$VITE_APP_ACCESS_TOKEN
ENV VITE_APP_IMAGE_URL_ORIGINAL=$VITE_APP_IMAGE_URL_ORIGINAL
ENV VITE_APP_IMAGE_URL_WIDTH50=$VITE_APP_IMAGE_URL_WIDTH50

# Copy dependency files first (cache-friendly)
COPY package.json pnpm-lock.yaml nx.json tsconfig.base.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the workspace
COPY . .

# Build the movies app
RUN pnpm nx build movies

# ---- Serve stage ----
FROM nginx:alpine

# Nx Vite output path:
# dist/apps/movies
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
