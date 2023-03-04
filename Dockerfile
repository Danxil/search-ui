FROM node:19-alpine AS search_ui

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 1000

ADD start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]
