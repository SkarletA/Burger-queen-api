FROM node:14-alpine3.15

# create directory
WORKDIR /home/node/app

# Install app dependecies
COPY package.json /home/node/app/
RUN npm install

# Bundle app source
COPY . /home/node/app/

# El seed necesita conectarse a Mongo con variables de entorno que solo
# existen en tiempo de ejecución, no durante el build de la imagen.
# Corre `npm run seed` una sola vez, manualmente, después del deploy.

EXPOSE 8080
CMD [ "npm", "run", "start" ]

