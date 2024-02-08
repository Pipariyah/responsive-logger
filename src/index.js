// src/index.js
class Logger {
  constructor() {
    this.defaultConfig = {};
    this.config = { ...this.defaultConfig };
    this.isBrowser = typeof window !== 'undefined';
    this.isNode = typeof window === 'undefined';
    this.env = '';
    this.initialized = false;
    this.originalConsole = { ...console };
    this.logToFile = this.logToFile.bind(this);
    this.createLogMethod = this.createLogMethod.bind(this);
    this.log = this.createLogMethod('log').bind(this);
    this.info = this.createLogMethod('info').bind(this);
    this.warn = this.createLogMethod('warn').bind(this);
    this.error = this.createLogMethod('error').bind(this);
    this.debug = this.createLogMethod('debug').bind(this);
    this.trace = this.createLogMethod('trace').bind(this);

    if (!this.initialized) {
      this.initialize();
    }
  }

  initialize() {
    this.isProduction = this.config.isProduction;
    this.logFilePath = this.config.logFilePath;
    this.initialized = true;

    // Intercept console.log
    if (this.isBrowser) {
      window.console = { ...console, ...this };
    } else {
      global.console = { ...console, ...this };
    }
  }

  setConfig(config) {
    if (config.logFilePath) {
      this.config = { ...this.defaultConfig, ...config };
    } else {
      this.config = { ...this.defaultConfig, ...config, logFilePath: null };
    }
    if (!this.initialized) {
      this.initialize();
    }
  }

  createLogMethod(level) {
    return (...messages) => {
      const date = new Date().toLocaleString(['en-IN','en-US', 'en-GB'], { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
      const logPrefix = `[${date}][${level.toUpperCase()}]`;

      if (this.isProduction) {
        if (this.isBrowser) {
          if (!window.log) {
            window.log = [];
          }
          window.log.push({ level, message: messages.join(' ') });
        } else {
          if (this.logFilePath !== null && this.isNode) {
            this?.logToFile(logPrefix + JSON.stringify(messages));
          }
        }
      } else {
        // Log to original console in non-production environment
        this.originalConsole[level](logPrefix, ...messages);
      }
    };
  }

  logToFile(...logs) {
    // Empty function placeholder for client-side
  }
}


const logger = new Logger();

// Initialize logger
logger.initialize();
// Augment the console object with the methods from the Logger instance
if (typeof console !== 'undefined') {
  console.initialized = logger.initialize.bind(logger);
  console.setConfig = logger.setConfig.bind(logger);
  console.logToFile = logger.logToFile.bind(logger);
  console.log = logger.log.bind(logger);
  console.info = logger.info.bind(logger);
  console.warn = logger.warn.bind(logger);
  console.error = logger.error.bind(logger);
  console.debug = logger.debug.bind(logger);
  console.trace = logger.trace.bind(logger);
}


module.exports = logger; // Export the logger instance directly
