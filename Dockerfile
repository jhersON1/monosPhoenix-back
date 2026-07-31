# syntax=docker/dockerfile:1

ARG NODE_VERSION=24
ARG PNPM_VERSION=11.15.1

# ---------------------------------------------------------------------------
# Stage 1: Builder – instala dependencias y compila el servidor HTTP.
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS builder

ARG PNPM_VERSION
WORKDIR /app

RUN npm install --global pnpm@${PNPM_VERSION}

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src ./src

RUN pnpm run build:http \
    && pnpm prune --prod

# ---------------------------------------------------------------------------
# Stage 2: Runtime – imagen mínima con solo lo necesario para producción.
# ---------------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]
