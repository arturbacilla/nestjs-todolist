FROM node:18-alpine
WORKDIR /frontend
COPY . .
RUN yarn install
ENTRYPOINT [ "yarn", "start" ]
EXPOSE 3000
