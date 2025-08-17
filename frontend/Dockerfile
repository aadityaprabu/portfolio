# Build stage
FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_BACKEND_URL
ARG VITE_PORT
ARG VITE_BASE_URL

RUN echo "Environment variables are:"
RUN echo $VITE_BACKEND_URL
RUN echo $VITE_PORT
RUN echo $VITE_BASE_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_PORT=$VITE_PORT
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
