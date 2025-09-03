ARG NODE_VERSION=23.0.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

CMD ["node", "index.js"]
