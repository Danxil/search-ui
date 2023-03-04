FROM node:19-alpine AS search_ui

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN rm -rf ./node_modules

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

COPY . .

EXPOSE 1000

ADD start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]
