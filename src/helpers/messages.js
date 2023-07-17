import messages from '../config/messages.json' assert { type: 'json' };

export const getMessage = (path) => {
  return messages[path] || null;
};
