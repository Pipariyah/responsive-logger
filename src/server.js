// src/server.js
const console = require('./index');

// Server-specific code
console.logToFile = function(...logs) {
    const fs = require('fs');
    fs.appendFile(this.logFilePath, logs.join('\n') + '\n', (err) => {});
};
