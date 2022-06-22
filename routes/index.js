const cors = require('cors');
const config = require('../config');

const { urlServer } = config;
const auth = require('./auth');
const staff = require('./staff');
const menu = require('./menu');
const menuLunch = require('./menuLunch');
const orders = require('./orders');

const root = (app, next) => {
  const pkg = app.get('pkg');
  app.use(cors());

  const corsOptions = {
    origin: `${urlServer}`,
    optionSucessStatus: 200,
  };
  app.get('/', cors(corsOptions), (req, res) => res.json({ name: pkg.name, version: pkg.versio, urlServer }));
  app.all('*', (req, resp, nextAll) => nextAll(404));
  // const test = app._router.stack.filter((r) => r.route)
  // .map((r) => Object.keys(r.route.methods)[0].toUpperCase().padEnd(7) + r.route.path).join("\n")
  // console.info(test);
  return next();
};

// eslint-disable-next-line consistent-return
const register = (app, routes, cb) => {
  if (!routes.length) {
    return cb();
  }

  routes[0](app, (err) => {
    if (err) {
      return cb(err);
    }
    return register(app, routes.slice(1), cb);
  });
};

module.exports = (app, next) => register(app, [
  auth,
  staff,
  menu,
  menuLunch,
  orders,
  root,
], next);
