FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# ENV MONGO_URI=mongodb://mongodb:27017/onlinebookstore
# ENV PORT=3000

# EXPOSE 3000

# CMD ["npm", "start"]