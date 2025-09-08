FROM node:23-slim

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install --legacy-peer-deps


COPY --chown=node:node . .

USER node

CMD ["node", "index.js"]
