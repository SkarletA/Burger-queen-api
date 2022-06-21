FROM node:14-alpine3.15

# create directory
WORKDIR /home/node/app

# Install app dependecies
COPY package.json /home/node/app/
RUN npm install

# Bundle app source
COPY . /home/node/app/

RUN npm run seed

EXPOSE 8080
CMD [ "npm", "run", "start" ]

