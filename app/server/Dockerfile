FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_URI=mongodb://mongodb:27017/onlinebookstore
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]