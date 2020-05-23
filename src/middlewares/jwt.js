const { verifyJwt } = require('../helpers/jwt');

const checkJWT = (req, res, next) => {
  const path = req.url;
  const excludedPaths = ['/auth/sign-up', '/auth/sign-in', '/auth/refresh'];
  const isExcluded = excludedPaths.find((p) => path.startsWith(p));
  if (isExcluded) return next();

  let token = req.headers['x-access-token'] || req.headers['authorization'];
  token = token ? token.slice(7, token.length) : null;
  if (!token) {
    return res.jsonUnauthorized(null, 'Invalid token.');
  }

  try {
    const decoded = verifyJwt(token);
    req.accountId = decoded.id;
    req.jwtVersion = decoded.version;
    next();
  } catch (error) {
    return res.jsonUnauthorized(null, 'Invalid token.');
  }
};

module.exports = checkJWT;
