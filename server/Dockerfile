FROM node:18

WORKDIR /app

COPY package*.json ./

ENV MONGO_URI=mongodb://mongo:27017/onlinebookstore

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]