FROM node:18.13.0-bullseye

RUN mkdir /app
WORKDIR /app

CMD ["npm", "start"]
