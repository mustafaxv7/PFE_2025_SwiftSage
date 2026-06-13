FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS server-deps
RUN npm ci --omit=dev

FROM base AS client-deps
COPY client/package.json client/package-lock.json ./client/
RUN cd client && npm ci

FROM client-deps AS client-build
COPY client/ ./client/
RUN npm run build --prefix client

FROM server-deps AS production
COPY --from=client-build /app/client/dist ./client/dist
COPY server/ ./server/
COPY swiftsage_dump.sql ./
COPY .env.example ./

ENV NODE_ENV=production
ENV PORT=5030

EXPOSE 5030

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5030/ || exit 1

CMD ["node", "./server/src/server.js"]
