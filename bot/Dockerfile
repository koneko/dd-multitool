FROM node:23-slim

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

USER node

CMD ["node", "index.js"]
