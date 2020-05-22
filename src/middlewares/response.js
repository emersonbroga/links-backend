const STATUS_OK = 200; // 200 - Everything worked as expected.
const STATUS_PROCESSING = 202; // 202 - Processing the request (often updating), try again later.
const STATUS_BAD_REQUEST = 400; // 400 - Bad Request (often missing a required parameter).
const STATUS_UNAUTHORIZED = 401; // 401 - Unauthorized Invalid or expired access token.
const STATUS_NOT_FOUND = 404; // 404 - The requested item doesn't exist.
const STATUS_SERVER_ERROR = 500; // 500 - Server error.

const jsonOK = function (data, message, metadata) {
  const status = STATUS_OK;
  message = message ? message : 'Successful request.';
  metadata = metadata ? metadata : {};
  data = data ? data : [];

  this.status(status);
  this.type('application/json');
  return this.json({ message, data, metadata, status });
};

const jsonBadRequest = function (data, message, metadata) {
  const status = STATUS_BAD_REQUEST;

  message = message ? message : 'Bad request.';
  metadata = metadata ? metadata : {};
  data = data ? data : [];

  this.status(status);
  this.type('application/json');
  return this.json({ message, data, metadata, status });
};

const jsonUnauthorized = function (data, message, metadata) {
  const status = STATUS_UNAUTHORIZED;

  message = message ? message : 'Unauthorized.';
  metadata = metadata ? metadata : {};
  data = data ? data : [];

  this.status(status);
  this.type('application/json');
  return this.json({ message, data, metadata, status });
};

const jsonNotFound = function (data, message, metadata) {
  const status = STATUS_NOT_FOUND;

  message = message ? message : 'Resource not found.';
  metadata = metadata ? metadata : {};
  data = data ? data : [];

  this.status(status);
  this.type('application/json');
  return this.json({ message, data, metadata, status });
};
const response = (req, res, next) => {
  res.jsonOK = jsonOK;
  res.jsonBadRequest = jsonBadRequest;
  res.jsonOK = jsonOK;
  res.jsonUnauthorized = jsonUnauthorized;
  res.jsonNotFound = jsonNotFound;
  next();
};

module.exports = response;
