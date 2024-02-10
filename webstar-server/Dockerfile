FROM node:20-buster

ARG DOCKER_NODE_ENV
ARG DOCKER_NPM_CMD

ENV NODE_ENV=${DOCKER_NODE_ENV}

RUN echo "Your NODE_ENV for Server is $NODE_ENV"

RUN mkdir -p /usr/web_star/server

WORKDIR /usr/web_star/server

COPY package.json .

RUN if [ "$DOCKER_NODE_ENV" == "prod" ]; then npm install --omit=dev ; \
    else npm install; \
    fi

COPY . .

ENTRYPOINT [ "npm" ]
# CMD [ "start" ]
