FROM node:18-alpine
WORKDIR /frontend
RUN yarn install
COPY . .
ENTRYPOINT [ "yarn", "start" ]
EXPOSE 3000
