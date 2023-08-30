FROM node:18.16.1

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4200
RUN npm run build
CMD ["npm", "start"]
