FROM node:18-alpine AS base

FROM base as builder
# Needed for running the docker container on M1/M2 because ARM images are different?!
RUN apk add --update libc6-compat python3 make g++ && rm -rf /var/cache/apk/*

# set working directory
WORKDIR /app
# install turbo
RUN yarn global add turbo
# copy all files into the working directory
COPY . .

RUN turbo prune --scope=@everfund-service/dashboard --docker

# =============================================
FROM base AS installer

WORKDIR /app

ARG TURBO_TOKEN
ARG TURBO_TEAM
RUN yarn set stable

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/patches patches/
COPY --from=builder /app/scripts scripts/
RUN yarn install

# # Build the project
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/tsup.config.json .
RUN yarn patch-package
RUN yarn dlx turbo run build:pkgs --filter=@everfund-service/dashboard...

# # #############################################
FROM base AS runner
WORKDIR /app

RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
  echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
  apk add doppler

COPY --from=installer /app .

# RUN apk add postgresql postgresql-contrib
RUN npm i -g zx
ARG DOPPLER_DASHBOARD_TOKEN

RUN yarn turbo run build:services