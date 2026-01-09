FROM node:lts-alpine3.23

ENV CHOKIDAR_USEPOLLING=true \
    WDS_SOCKET_PORT=0 \
    WATCHPACK_POLLING=true   

WORKDIR /app
COPY . .
RUN npm ci
CMD ["npm", "run", "dev"]