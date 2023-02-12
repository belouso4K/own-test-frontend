FROM node:14.17-alpine

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN apk update && apk upgrade && apk add git

COPY package.json /app

RUN node -v
RUN npm -v

#RUN npm rebuild
RUN npm cache clear --force && npm i -g npm && npm i

COPY . /app
RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000

ENV NODE_ENV=production

CMD [ "npm", "start" ]


