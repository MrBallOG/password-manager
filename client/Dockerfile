FROM node:16.13.2 as build

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

RUN npm ci --production

COPY ./src ./src/
COPY ./public ./public/

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build /app/build /var/www/html/
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY ./nginx/global.pass /etc/keys/
COPY ./nginx/localhost.key /etc/ssl/private/
COPY ./nginx/localhost.crt /etc/ssl/certs/

CMD ["nginx", "-g", "daemon off;"]

