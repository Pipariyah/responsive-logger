// src/server.js
const console = require('./index');
let fs;

if (typeof window === 'undefined' && typeof require === 'function') {
  // Server-specific code that uses 'fs'
  console.logToFile = function(...logs) {
    try {
        fs = require('fs');
        fs.appendFile(this.logFilePath, logs.join('\n') + '\n', (err) => {});
    } catch (error) {
        
    }
  };
}

// Browser-specific code
// You can handle browser-specific logging differently or provide a polyfill for 'fs' functionality
