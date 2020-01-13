FROM node:10.16.3

RUN mkdir /usr/src/app
WORKDIR usr/src/app

RUN npm install -g @angular/cli@7.3.9
COPY . /usr/src/app

CMD ng serve --host 0.0.0.0 --port 4200