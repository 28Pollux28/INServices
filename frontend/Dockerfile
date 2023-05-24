FROM node:20.2-alpine3.16 as build

WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm install
COPY . /app
RUN node ./node_modules/react-scripts/bin/react-scripts.js build

FROM nginx:1.23.4-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
