FROM node:20.19.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production
RUN apk add --no-cache curl
COPY . .

CMD ["node", "index.js"]
