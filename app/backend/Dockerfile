FROM node:18-alpine
WORKDIR /backend
COPY . .
RUN yarn install

ENTRYPOINT [ "sh", "-c" ,"yarn prisma migrate dev && yarn start:dev" ]

EXPOSE 3001
