FROM node:latest

RUN apt-get update -y && apt-get install rsync -y

WORKDIR /app
COPY . .

CMD ["npm", "run", "dev-start"]

EXPOSE 3000