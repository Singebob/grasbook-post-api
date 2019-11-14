FROM node:12.12.0 as builder 

WORKDIR /posts

COPY package*.json src/ ./

RUN npm install && npm build

FROM node:12.12.0

WORKDIR /posts/app

COPY --from=builder ./posts/dist/ ./

COPY package*.json ./

CMD ["npm","run","start"] 
