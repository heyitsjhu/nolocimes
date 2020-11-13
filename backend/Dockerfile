FROM node:slim

WORKDIR /usr/src/app/backend

ENV PATH /usr/src/app/backend/node_modules/.bin:$PATH

COPY ./backend/package*.json ./

RUN npm install 

COPY ./backend ./

RUN ls .