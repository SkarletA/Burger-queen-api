const jwt = require('jsonwebtoken');
const config = require('../config');
const staffSchema = require('../models/staffSch');

const { adminRole } = config;

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers || req.query.authorization;

  if (!authorization) {
    return next();
  }

  jwt.verify(authorization, secret, (err, decodedToken) => {
    if (err) {
      return next(403);
    }
    req.decodedToken = decodedToken;
    return next();
    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
  });
};

module.exports.isAuthenticated = async (req) => {
  const user = await staffSchema.findOne({ email: req.decodedToken.email }).exec();
  return req.decodedToken.email === user.email;
};

module.exports.isAdmin = async (req) => {
  const user = await staffSchema.findOne({ email: req.decodedToken.email }).exec();
  return user.role === adminRole;
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
