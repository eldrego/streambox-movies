# ---- Build stage ----
FROM node:20-alpine AS builder

RUN corepack enable

WORKDIR /app

# TMDB API credentials
ARG VITE_TMDB_API_KEY
ARG VITE_APP_BASE_URL
ARG VITE_APP_ACCESS_TOKEN
ARG VITE_APP_IMAGE_URL_ORIGINAL
ARG VITE_APP_IMAGE_URL_WIDTH50

ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY
ENV VITE_APP_BASE_URL=$VITE_APP_BASE_URL
ENV VITE_APP_ACCESS_TOKEN=$VITE_APP_ACCESS_TOKEN
ENV VITE_APP_IMAGE_URL_ORIGINAL=$VITE_APP_IMAGE_URL_ORIGINAL
ENV VITE_APP_IMAGE_URL_WIDTH50=$VITE_APP_IMAGE_URL_WIDTH50

# New Relic Browser Monitoring — baked into the JS bundle at build time
ARG VITE_NEW_RELIC_ACCOUNT_ID
ARG VITE_NEW_RELIC_TRUST_KEY
ARG VITE_NEW_RELIC_AGENT_ID
ARG VITE_NEW_RELIC_LICENSE_KEY
ARG VITE_NEW_RELIC_APP_ID

ENV VITE_NEW_RELIC_ACCOUNT_ID=$VITE_NEW_RELIC_ACCOUNT_ID
ENV VITE_NEW_RELIC_TRUST_KEY=$VITE_NEW_RELIC_TRUST_KEY
ENV VITE_NEW_RELIC_AGENT_ID=$VITE_NEW_RELIC_AGENT_ID
ENV VITE_NEW_RELIC_LICENSE_KEY=$VITE_NEW_RELIC_LICENSE_KEY
ENV VITE_NEW_RELIC_APP_ID=$VITE_NEW_RELIC_APP_ID

# Copy dependency files first for better layer caching
COPY package.json pnpm-lock.yaml nx.json tsconfig.base.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm nx build movies

# ---- Serve stage ----
FROM nginx:alpine AS runner

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/movies.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 4202

CMD ["nginx", "-g", "daemon off;"]
