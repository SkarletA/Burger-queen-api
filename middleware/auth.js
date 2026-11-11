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
  if (!req.decodedToken) return false;
  const user = await staffSchema.findOne({ email: req.decodedToken.email }).exec();
  return !!user && req.decodedToken.email === user.email;
};

module.exports.isAdmin = async (req) => {
  if (!req.decodedToken) return false;
  const user = await staffSchema.findOne({ email: req.decodedToken.email }).exec();
  return !!user && user.role === adminRole;
};

module.exports.requireAuth = async (req, resp, next) => {
  try {
    const authenticated = await module.exports.isAuthenticated(req);
    return authenticated ? next() : next(401);
  } catch (err) {
    return next(err);
  }
};

module.exports.requireAdmin = async (req, resp, next) => {
  try {
    if (!await module.exports.isAuthenticated(req)) return next(401);
    const admin = await module.exports.isAdmin(req);
    return admin ? next() : next(403);
  } catch (err) {
    return next(err);
  }
};
