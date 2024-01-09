FROM node:18-alpine

RUN npm install

WORKDIR /app

COPY package*.json ./

COPY . .

CMD [ "node", "start" ]