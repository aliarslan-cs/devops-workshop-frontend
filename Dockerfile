FROM node:16 as build
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN yarn build

# --------------------- #

FROM nginx

LABEL name="Devops Workshop Frontend Application" \
      maintainer="Ali Arslan <aliarsal@outlook.com>" \
      summary="Frontend react application for workshop-project"

EXPOSE 80

COPY --from=build /app/build /usr/share/nginx/html

# docker build -t aliarsal/workshop-project-frontend:1.0 .
# docker run -it --rm --init -p 8090:80 --name the-frontend --network the-network aliarsal/workshop-project-frontend:1.0
