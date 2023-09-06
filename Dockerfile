FROM node

WORKDIR /app

COPY . .

RUN npm install -g yarn

RUN yarn

RUN yarn build

EXPOSE  1337

CMD ['yarn', 'start']