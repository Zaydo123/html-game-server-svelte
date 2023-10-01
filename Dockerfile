# First stage
FROM node:20-alpine AS builder
WORKDIR /app

# Pass build args from .env file
ARG PUBLIC_SITE_NAME
ARG PUBLIC_SHORT_SITE_NAME
ARG PUBLIC_SITE_DESCRIPTION
ARG PUBLIC_SITE_TITLE
ARG SECRET_DATABASE_URL
ARG SECRET_DATABASE_PORT
ARG SECRET_DATABASE_NAME
ARG SECRET_DATABASE_USER
ARG SECRET_DATABASE_PASSWORD
ARG SECRET_ADMIN_USERNAME
ARG SECRET_ADMIN_PASSWORD
ARG SECRET_CLOUDFLARE_ACCESS_KEY_ID
ARG SECRET_CLOUDFLARE_ACCESS_KEY
ARG SECRET_CLOUDFLARE_TOKEN_VALUE
ARG SECRET_CLOUDFLARE_ENDPOINT
ARG SECRET_CLOUDFLARE_BUCKET_NAME
ARG SECRET_CLOUDFLARE_BUCKET_URL
ARG CHROMEBOOK_ONLY_MODE

# Set them as env vars for the build process
ENV PUBLIC_SITE_NAME=${PUBLIC_SITE_NAME}
ENV PUBLIC_SHORT_SITE_NAME=${PUBLIC_SHORT_SITE_NAME}
ENV PUBLIC_SITE_DESCRIPTION=${PUBLIC_SITE_DESCRIPTION}
ENV PUBLIC_SITE_TITLE=${PUBLIC_SITE_TITLE}
ENV SECRET_DATABASE_URL=${SECRET_DATABASE_URL}
ENV SECRET_DATABASE_PORT=${SECRET_DATABASE_PORT}
ENV SECRET_DATABASE_NAME=${SECRET_DATABASE_NAME}
ENV SECRET_DATABASE_USER=${SECRET_DATABASE_USER}
ENV SECRET_DATABASE_PASSWORD=${SECRET_DATABASE_PASSWORD}
ENV SECRET_ADMIN_USERNAME=${SECRET_ADMIN_USERNAME}
ENV SECRET_ADMIN_PASSWORD=${SECRET_ADMIN_PASSWORD}
ENV SECRET_CLOUDFLARE_ACCESS_KEY_ID=${SECRET_CLOUDFLARE_ACCESS_KEY_ID}
ENV SECRET_CLOUDFLARE_ACCESS_KEY=${SECRET_CLOUDFLARE_ACCESS_KEY}
ENV SECRET_CLOUDFLARE_TOKEN_VALUE=${SECRET_CLOUDFLARE_TOKEN_VALUE}
ENV SECRET_CLOUDFLARE_ENDPOINT=${SECRET_CLOUDFLARE_ENDPOINT}
ENV SECRET_CLOUDFLARE_BUCKET_NAME=${SECRET_CLOUDFLARE_BUCKET_NAME}
ENV SECRET_CLOUDFLARE_BUCKET_URL=${SECRET_CLOUDFLARE_BUCKET_URL}
ENV CHROMEBOOK_ONLY_MODE=${CHROMEBOOK_ONLY_MODE}

COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

# Second stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
CMD [ "node", "build" ]
