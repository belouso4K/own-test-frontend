FROM node:14.15.4-alpine

RUN mkdir -p /var/www/nuxt-app
WORKDIR /var/www/nuxt-app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000

CMD [ "npm", "start" ]
