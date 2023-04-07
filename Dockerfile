FROM node:12.22.10 AS dev

ENV PATH /usr/src/main-web-angular/node_modules/.bin:$PATH

WORKDIR /usr/src/main-web-angular

COPY . .

RUN yarn install

EXPOSE 4400

CMD ng serve --host 0.0.0.0 --port 4400

FROM node:12.22.10 AS prodution

ENV PATH /usr/src/main-web-angular/node_modules/.bin:$PATH

WORKDIR /usr/src/main-web-angular

COPY . .

RUN yarn install

CMD ng build -prod --aot=false