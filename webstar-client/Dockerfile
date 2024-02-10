FROM node:alpine

ARG DOCKER_NODE_ENV
ENV REACT_APP_NODE_ENV=${DOCKER_NODE_ENV}

RUN if [ "$DOCKER_NODE_ENV" == "prod" ]; \
      then echo "Your REACT_APP_NODE_ENV for Production staging = $REACT_APP_NODE_ENV"; \
      else echo "You your 'REACT_APP_NODE_ENV' for Development = $REACT_APP_NODE_ENV"; \
    fi

RUN mkdir -p /usr/web_star/client

WORKDIR /usr/web_star/client

COPY package.json .

RUN if [ "$DOCKER_NODE_ENV" == "prod" ]; \
    then npm install --omit=dev; \
    else npm install; \
    fi

COPY . .

CMD ["npm","start"]
