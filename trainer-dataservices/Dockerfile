FROM node:dubnium

MAINTAINER Mihail Puica "mihail@mpdeveloper.ca"

WORKDIR /var/projects/oms-trainer/trainer-dataservices
COPY . .
RUN npm install pm2 -g
RUN npm install

CMD [ "pm2-docker", "process.yml" ]
