// test.js
require('../dist/responsive-loger');
console.log('This is a log message.',{data:"this is test"});
console.info('This is an informational message.');
console.warn('Warning:', 'Something unusual happened.');
console.error('Error occurred:', new Error('Example error'));
console.debug('Debugging message:', 'Additional details.');
console.trace('Tracing message:', 'Detailed trace information.');
