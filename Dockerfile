FROM node:20-alpine AS base
WORKDIR /app

FROM base AS frontend-deps
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci

FROM base AS frontend-build
WORKDIR /app/frontend
COPY --from=frontend-deps /app/frontend/node_modules ./node_modules
COPY frontend ./
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

FROM base AS backend-deps
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci

FROM base AS backend-build
WORKDIR /app/backend
COPY --from=backend-deps /app/backend/node_modules ./node_modules
COPY backend ./
RUN npm run build

FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY --from=backend-build /app/backend/dist ./dist
COPY --from=frontend-build /app/frontend/build ./public

EXPOSE 3000
CMD ["node", "dist/index.js"]