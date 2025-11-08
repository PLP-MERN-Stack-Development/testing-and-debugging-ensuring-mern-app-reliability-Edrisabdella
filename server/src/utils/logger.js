const logger = {
  info: (message, meta = {}) => {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      ...meta
    }));
  },

  error: (message, error = null, meta = {}) => {
    console.error(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : null,
      ...meta
    }));
  },

  warn: (message, meta = {}) => {
    console.warn(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'WARN',
      message,
      ...meta
    }));
  },

  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(JSON.stringify({
        timestamp: new Date().toISOString(),
        level: 'DEBUG',
        message,
        ...meta
      }));
    }
  }
};

export default logger;