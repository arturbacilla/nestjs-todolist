FROM node:18-alpine
WORKDIR /frontend

ARG FRONTEND_PORT
ENV FRONTEND_PORT=$FRONTEND_PORT
RUN test -n "$FRONTEND_PORT" || (echo "FRONTEND_PORT  not set" && false)

RUN yarn install
COPY . .


ENTRYPOINT [ "yarn", "start" ]
EXPOSE $FRONTEND_PORT
