const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');
const staffRoutes = require('./routes/staff');
const menuRoutes = require('./routes/menu');
const menuLunchRoutes = require('./routes/menuLunch');
const orderRoutes = require('./routes/orders');

const {
  port, dbUrl, secret, dbMongo,
} = config;
const app = express();
console.info('dbU', dbUrl); // para que no llore dbUrl

// Conectar MongoDB
mongoose.connect(dbMongo)
  .then(() => console.info('Conect with Database'))
  .catch((error) => console.error(error));

// TODO: Conexión a la Base de Datos (MongoDB o MySQL)
app.set('config', config);
app.set('pkg', pkg);

// parse application/x-www-form-urlencoded
app.use('/home', staffRoutes);
app.use('/home', menuRoutes);
app.use('/home', menuLunchRoutes);
app.use('/home', orderRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authMiddleware(secret));

// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }

  app.use(errorHandler);

  app.listen(port, () => {
    console.info(`App listening on port ${port}`);
  });
});
