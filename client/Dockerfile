FROM node:12.18-alpine
ENV NODE_ENV=production

WORKDIR /usr/src/app/client
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
