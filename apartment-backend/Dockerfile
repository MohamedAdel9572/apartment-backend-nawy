FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Install wait-port to delay start until DB is ready
RUN npm install -g wait-port

CMD wait-port db:1433 && npm start
