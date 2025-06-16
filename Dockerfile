# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# Stage 2: Production image
FROM node:22-alpine
WORKDIR /opt/app
COPY --from=builder /opt/app/package.json ./package.json
COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/dist ./dist
CMD ["node", "./dist/main.js"]
