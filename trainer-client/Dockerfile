FROM node:8

MAINTAINER Mihail Puica "mihail@mpdeveloper.ca"

RUN \
    apt-get update && \
    apt-get install -y vim

WORKDIR /var/projects/oms-trainer/trainer-client

COPY . .
RUN npm install pm2 -g
RUN npm install electron
RUN npm install
RUN npm rebuild node-sass
RUN npm run build:web

#CMD [ "pm2-docker", "process.yml" ]
