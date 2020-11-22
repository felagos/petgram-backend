FROM node:14

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "./"]

RUN npm i

COPY [".", "."]

ENV MONGODB_URI=$MONGODB_URI

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]