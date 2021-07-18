FROM node:12.18-alpine
ENV NODE_ENV=production
ENV PORT=5000
WORKDIR /usr/src/app/server
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production 
COPY . .
EXPOSE 5000
CMD ["node","app.js"]
