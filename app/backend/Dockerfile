FROM node:18-alpine
WORKDIR /backend
COPY . .
RUN yarn install
ENTRYPOINT [ "yarn", "start:dev" ]
EXPOSE 3001
