FROM node:20-alpine3.16
WORKDIR /backend
RUN yarn install

ARG VITE_BACKEND_PORT
ENV VITE_BACKEND_PORT=$VITE_BACKEND_PORT
RUN test -n "$VITE_BACKEND_PORT" || (echo "VITE_BACKEND_PORT  not set" && false)

RUN ["yarn", "global", "add", "prisma@5.5.2"]

COPY . .

CMD ["yarn", "prisma", "migrate", "dev"]
ENTRYPOINT [ "sh", "-c" ,"yarn start:dev" ]

EXPOSE $VITE_BACKEND_PORT
