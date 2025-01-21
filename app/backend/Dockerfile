FROM node:20-alpine3.16
WORKDIR /backend
COPY . .
RUN yarn install

ENTRYPOINT [ "sh", "-c" ,"yarn prisma migrate dev && yarn start:dev" ]

EXPOSE 3001
