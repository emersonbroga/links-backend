const { get } = require('../helpers/content');
const messages = require('../config/messages.json');

const getMessageByPath = (path) => {
  return get(messages, path, null);
};

const getCustomMessage = (item, key) => {
  const customMessage = get(messages, key, null);
  if (!customMessage) {
    console.log('Unable to find custom message for path:', key);
  }
  return customMessage || item.message;
};

const getValidationErrors = (error, path) => {
  const validationErrors = {};
  if (!error || !error.details) return validationErrors;

  error.details.map((item) => {
    const key = item.context.key;
    const customMessage = getCustomMessage(item, `${path}.${key}.${item.type}`);
    validationErrors[key] = customMessage || item.message;
  });

  return validationErrors;
};

module.exports = {
  getMessageByPath,
  getCustomMessage,
  getValidationErrors,
};
