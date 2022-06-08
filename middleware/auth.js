const jwt = require('jsonwebtoken');
const config = require('../config');

const { adminEmail, adminRole } = config;

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next();
  }

  // const [token] = authorization.split(' ');
  // console.info('split', authorization.split(' '));
  // if (type.toLowerCase() !== 'bearer') {
  //   return next();
  // }

  jwt.verify(authorization, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    req.decodedToken = decodedToken;
    console.info('decodeToken', decodedToken);
    return next();
    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
  });
};

module.exports.isAuthenticated = (req) => {
  console.info(req.decodedToken.email === adminEmail);
  return req.decodedToken.email === adminEmail;
};

module.exports.isAdmin = (req) => {
  console.info(req.decodedToken.role === adminRole);
  return req.decodedToken.role === adminRole;
};

module.exports.requireAuth = (req, resp, next) => (
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : next()
);

module.exports.requireAdmin = (req, resp, next) => (
  // eslint-disable-next-line no-nested-ternary
  (!module.exports.isAuthenticated(req))
    ? next(401)
    : (!module.exports.isAdmin(req))
      ? next(403)
      : next()
);
