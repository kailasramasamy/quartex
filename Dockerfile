FROM node:22-slim

RUN corepack enable && corepack prepare pnpm@10.29.3 --activate

WORKDIR /app
COPY . .
RUN pnpm install --force
RUN pnpm build:web

WORKDIR /app/apps/web
EXPOSE 8080
ENV PORT=8080
CMD ["node", "server.prod.js"]
