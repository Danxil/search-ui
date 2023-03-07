FROM --platform=linux/amd64 node:19-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm ci
RUN npm run build
RUN rm -rf ./node_modules && npm cache clean --force

ENV NODE_ENV production

RUN npm ci --omit=dev
RUN rm -rf ./package-lock.json && npm cache clean --force

FROM node:19-alpine AS prod

COPY --from=builder /usr/src/app ./

EXPOSE 1000

CMD ["npm", "start"]