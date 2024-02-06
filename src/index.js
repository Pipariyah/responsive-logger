// index.js

class Logger {
  constructor() {
    this.isBrowser = typeof window !== 'undefined';
    this.env = process.env.APP_ENV || process.env.NODE_ENV || '';
    this.isProduction = this.env.toLowerCase() === 'production';
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

  initialize(isProduction = false) {
    this.isProduction = isProduction;
    this.initialized = true;

    // Intercept console.log
    if (this.isBrowser) {
      window.console = { ...console, ...this };
    } else {
      global.console = { ...console, ...this };
    }
  }

  createLogMethod(level) {
    return (...messages) => {
      const logPrefix = `[${new Date().toISOString()}][${level.toUpperCase()}]`;

      if (this.isProduction) {
        if (this.isBrowser) {
          if (!window.log) {
            window.log = [];
          }
          window.log.push({ level, message: messages.join(' ') });
        } else {
          this.logToFile(logPrefix + JSON.stringify(messages));
        }
      } else {
        // Log to original console in non-production environment
        this.originalConsole[level](logPrefix, ...messages);
      }
    };
  }

  logToFile(...logs) {
    // Implement server-side logic to log to a file
    // Example: Write logs to a file using fs module in Node.js
    this.originalConsole.log('Logs written to file:', logs);
  }
}

const logger = new Logger();

// Initialize logger
logger.initialize();

module.exports = {
  ...logger,
  initialized: function(isProduction) {
    logger.initialize(isProduction);
  }
};