FROM node:20-alpine3.16
WORKDIR /backend
RUN yarn install
RUN ["yarn", "global", "add", "prisma@5.5.2"]

COPY . .

ENTRYPOINT [ "sh", "-c" ,"yarn prisma migrate dev && yarn start:dev" ]

EXPOSE 3001
