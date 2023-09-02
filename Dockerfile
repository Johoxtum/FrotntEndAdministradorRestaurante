FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

RUN ls -alt

# Stage 2

FROM nginx:1.17-alpine

COPY --from=build /usr/src/app/dist/administrador-restaurante /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200
