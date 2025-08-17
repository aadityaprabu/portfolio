FROM node:20.19.0-alpine

WORKDIR /app

COPY app/package*.json ./

RUN npm install --production

COPY app/. .

CMD ["node", "index.js"]
