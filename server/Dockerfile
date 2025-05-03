# Dockerfile for Audiantix Express backend
FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "index.js"]

