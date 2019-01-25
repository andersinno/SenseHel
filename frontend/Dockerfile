FROM node:10

WORKDIR /app/frontend
COPY yarn.lock package.json /app/frontend/
COPY src/ /app/frontend/src/
COPY public/ /app/frontend/public/

RUN yarn install

EXPOSE 3000
CMD ["yarn", "start"]
