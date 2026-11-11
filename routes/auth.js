const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const config = require('../config');
const staffSchema = require('../models/staffSch');

const { secret, urlServer } = config;

const corsOptions = {
  origin: `${urlServer}`,
  optionSucessStatus: 200,
};

/** @module auth */
module.exports = (app, nextMain) => {
  /**
   * @name /auth
   * @description Crea token de autenticación.
   * @path {POST} /auth
   * @body {String} email Correo
   * @body {String} password Contraseña
   * @response {Object} resp
   * @response {String} resp.token Token a usar para los requests sucesivos
   * @code {200} si la autenticación es correcta
   * @code {400} si no se proveen `email` o `password` o ninguno de los dos
   * @auth No requiere autenticación
   */
  app.post('/auth', cors(corsOptions), async (req, resp, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(400);
    }

    const user = await staffSchema.findOne({ email }).exec();

    // No revelar si fue el email o la contraseña lo que no coincidió.
    if (!user || !await bcrypt.compare(password, user.password)) {
      return next(404);
    }

    function generateAccessToken(user) {
      return jwt.sign(user, secret, { expiresIn: '120m' });
    }
    const accessToken = generateAccessToken({ email: user.email });

    resp.status(200).json({ token: accessToken });
  });

  return nextMain();
};
