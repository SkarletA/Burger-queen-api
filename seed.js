const mongoose = require('mongoose');
const staff = require('./models/staffSch');
const seedStaff = require('./models/staffSeed');
const menu = require('./models/menuSch');
const seedMenu = require('./models/menuSeed');
const menuLunch = require('./models/menuLunchSch');
const seedMenuLunch = require('./models/menuLunchSeed');
const order = require('./models/orderSch');
const seedOrder = require('./models/orderSeed');
const config = require('./config');

const { dbMongo } = config;

mongoose
  .connect(dbMongo, {
    useNewUrlParser: true, useUnifiedTopology: true,
  })
  .then(() => console.info('MONGO CONNECTION OPEN!!!'))
  .catch((error) => console.error(error));

const seedDB = async () => {
  await staff.deleteMany({});
  await staff.insertMany(seedStaff);
  await menu.deleteMany({});
  await menu.insertMany(seedMenu);
  await menuLunch.deleteMany({});
  await menuLunch.insertMany(seedMenuLunch);
  await order.deleteMany({});
  await order.insertMany(seedOrder);
};

seedDB().then(() => {
  mongoose.connection.close();
});
