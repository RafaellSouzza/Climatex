FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g json-server

COPY . .

RUN npm run build

EXPOSE 8080

EXPOSE 8000

CMD [ "http-server", "dist" ]
