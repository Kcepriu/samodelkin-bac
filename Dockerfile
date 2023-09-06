FROM node

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build

EXPOSE  1337

CMD ['yarn', 'start']