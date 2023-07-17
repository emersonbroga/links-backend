import { verifyJwt, getTokenFromHeaders } from '../helpers/jwt.js';

const checkJwt = (req, res, next) => {
  const { url: path } = req;

  const excludedPaths = ['/auth/sign-in', '/auth/sign-up', '/auth/refresh'];
  const isExcluded = !!excludedPaths.find((p) => p.startsWith(path));
  if (isExcluded) return next();

  const token = getTokenFromHeaders(req.headers);
  if (!token) {
    return res.jsonUnauthorized(null, 'Invalid token');
  }

  try {
    const decoded = verifyJwt(token);
    req.accountId = decoded.id;
    next();
  } catch (error) {
    return res.jsonUnauthorized(null, 'Invalid token');
  }
};

export default checkJwt;
