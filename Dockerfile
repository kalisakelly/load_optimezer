# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV PORT=3000
ENV NODE_ENV=production
ENV DATABASE_URL=postgres://postgres:postgres@db:5432/loadfleat

EXPOSE ${PORT}
CMD ["node", "dist/main"]