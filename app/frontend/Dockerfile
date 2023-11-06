FROM node:16-alpine
WORKDIR /frontend
COPY . .
RUN yarn install
ENTRYPOINT [ "yarn", "start" ]
EXPOSE 3000
