FROM node:20-alpine3.16
WORKDIR /backend
RUN yarn install
RUN ["yarn", "global", "add", "prisma@5.5.2"]

COPY . .

CMD ["yarn", "prisma", "migrate", "dev"]
ENTRYPOINT [ "sh", "-c" ,"yarn start:dev" ]

EXPOSE 3001
