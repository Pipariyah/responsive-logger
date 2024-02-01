// logger.js
const isBrowser = typeof window !== 'undefined';

const originalConsole = { ...console };

const logger = {};

const createLogMethod = (level, originalMethod) => (...messages) => {
  const logPrefix = process.env.NODE_ENV === 'production' ? `[${level.toUpperCase()}]` : `[${new Date().toISOString()}][${level.toUpperCase()}]`;
  originalMethod.call(originalConsole, logPrefix, ...messages);
};

logger.log = createLogMethod('log', originalConsole.log);
logger.info = createLogMethod('info', originalConsole.info);
logger.warn = createLogMethod('warn', originalConsole.warn);
logger.error = createLogMethod('error', originalConsole.error);
logger.debug = createLogMethod('debug', originalConsole.debug);
logger.trace = createLogMethod('trace', originalConsole.trace);

// Intercept console.log
console = logger;

// Make the logger globally available
if (isBrowser) {
  window.console = console;
} else {
  global.console = console;
}

module.exports = console;
