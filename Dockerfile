FROM node:12.12.0 as builder 

WORKDIR /posts

COPY package*.json src/ tsconfig.json ./

RUN npm install && npm run build

FROM node:12.12.0

WORKDIR /posts/app

COPY --from=builder ./posts/dist/ ./dist

COPY --from=builder ./posts/node_modules ./node_modules

COPY package*.json ./

CMD ["npm","run","start"] 
