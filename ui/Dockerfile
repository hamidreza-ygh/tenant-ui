# build stage
FROM node:lts-alpine as build-stage

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json'
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory
COPY . .

# build app for production with minification
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY public/config.js /usr/share/nginx/html

COPY entrypoint.sh /entrypoint.sh
# RUN sed -i -e 's/${VUE_APP_USER_API_URL}/'"$VUE_APP_USER_API_URL"'/g' /usr/share/nginx/html/config.js
EXPOSE 80

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
# CMD ["nginx", "-g", "daemon off;"]