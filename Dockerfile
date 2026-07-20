# syntax=docker/dockerfile:1

ARG NODE_RUNTIME_VERSION=24
ARG PNPM_VERSION=11.15.1

FROM public.ecr.aws/lambda/nodejs:${NODE_RUNTIME_VERSION} AS builder

ARG PNPM_VERSION
WORKDIR ${LAMBDA_TASK_ROOT}

RUN npm install --global pnpm@${PNPM_VERSION}

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY nest-cli.lambda.json tsconfig.json tsconfig.build.json webpack.config.js ./
COPY src ./src

RUN pnpm run build:lambda \
    && pnpm prune --prod

FROM public.ecr.aws/lambda/nodejs:${NODE_RUNTIME_VERSION} AS runtime

ENV NODE_ENV=production
WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder ${LAMBDA_TASK_ROOT}/package.json ./package.json
COPY --from=builder ${LAMBDA_TASK_ROOT}/node_modules ./node_modules
COPY --from=builder ${LAMBDA_TASK_ROOT}/dist/lambda.js ./dist/lambda.js

EXPOSE 8080

CMD ["dist/lambda.handler"]
