FROM node:20.19.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["node", "index.js"]
