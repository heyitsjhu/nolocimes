FROM node:slim

WORKDIR /usr/src/app/frontend

ENV PATH /usr/src/app/frontend/node_modules/.bin:$PATH

COPY ./frontend/package*.json ./

RUN npm install 

COPY ./frontend ./

RUN ls .