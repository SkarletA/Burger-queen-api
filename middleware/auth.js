const jwt = require('jsonwebtoken');

module.exports = (secret) => (req, resp, next) => {
  const { authorization } = req.headers;
  console.info(authorization);

  if (!authorization) {
    return resp.send('!authorization access denied');
  }

  const [token] = authorization.split(' ');
  // if (type.toLowerCase() !== 'bearer') {
  //   return next();
  // }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      console.info('error en el token');
      resp.send('error en la verificación del token ');
    } else {
      req.decodedToken = decodedToken;
      return next();
    }
    console.info('token verify', token);
    // TODO: Verificar identidad del usuario usando `decodeToken.uid`
  });
};

module.exports.isAuthenticated = (req) => (
  // TODO: decidir por la informacion del request si la usuaria esta autenticada
  false
);

module.exports.isAdmin = (req) => (
  // TODO: decidir por la informacion del request si la usuaria es admin
  false
);

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
