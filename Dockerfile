FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN yarn build

RUN yarn global add serve

ENTRYPOINT ["serve", "-s", "build", "-p", "80"]

# docker build -t aliarsal/workshop-project-frontend:1.0 .
# docker run -it --rm --init -p 8090:80 --name the-frontend --network the-network aliarsal/workshop-project-frontend:1.0