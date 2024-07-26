FROM node:20
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
