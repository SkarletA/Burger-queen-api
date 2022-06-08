const jwt = require('jsonwebtoken');
const config = require('../config');

const { secret, adminEmail, adminPassword } = config;

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
  app.post('/auth', (req, resp, next) => {
    // const { email, password } = req.body;
    const email = adminEmail;
    const password = adminPassword;

    if (!email || !password) {
      return next(400);
    }

    // TODO: autenticar a la usuarix
    const user = {
      email,
      role: 'Admin',
    };

    function generateAccessToken(user) {
      return jwt.sign(user, secret, { expiresIn: '120m' });
    }
    const accessToken = generateAccessToken(user);

    resp.header('authorization', accessToken).json({
      message: 'si la autenticación es correcta',
      token: accessToken,
    });

    next(200);
  });

  return nextMain();
};
