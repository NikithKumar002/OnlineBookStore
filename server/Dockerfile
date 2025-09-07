FROM ubuntu:24_04
RUN apt-get update && apt-get install -y nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]