FROM node:slim

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

COPY backend ./backend

COPY frontend ./frontend

COPY .eslintrc.json .

COPY .eslintignore .

COPY .prettierrc .

COPY babel.config.js .

RUN npm run bootstrap

EXPOSE 3001

EXPOSE 5001

EXPOSE 8080