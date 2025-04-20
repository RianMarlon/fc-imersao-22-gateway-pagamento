FROM node:22-slim

RUN apt update && \
  apt install procps -y

WORKDIR /home/node/app

COPY . .

RUN npm install

CMD [ "tail", "-f", "/dev/null" ]
