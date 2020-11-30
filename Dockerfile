FROM node:slim

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install -g lerna --loglevel notice

COPY package*.json ./

COPY backend ./backend

COPY frontend ./frontend

COPY .eslintrc.json .

COPY .eslintignore .

COPY .prettierrc .

COPY babel.config.js .

COPY lerna.json .

RUN lerna bootstrap

RUN npm run bootstrap

EXPOSE 3001

EXPOSE 5001