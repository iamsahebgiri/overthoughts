FROM node:lts-alpine3.18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY index.js ./

ENV SERVER_NO=1

CMD [ "npm", "start" ]