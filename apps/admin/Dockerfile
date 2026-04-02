FROM node:22-slim

RUN corepack enable && corepack prepare pnpm@10.29.3 --activate

WORKDIR /app
COPY . .
RUN pnpm install --force

ARG VITE_API_URL=https://api.quartex.in/api/v1
ENV VITE_API_URL=$VITE_API_URL
RUN pnpm build:admin

WORKDIR /app/apps/admin
EXPOSE 8080
ENV PORT=8080
CMD ["node", "server.prod.js"]
