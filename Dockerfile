FROM node:12-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm install -g npm@latest
RUN npm install
RUN npm run postinstall
EXPOSE 3000

CMD ["npm", "start"]
