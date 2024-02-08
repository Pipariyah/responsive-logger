# Responsive Logger

`responsive-logger` is a versatile logging library crafted to seamlessly operate in both Node.js and browser environments.

## Installation

You can easily install `responsive-logger` via npm:

```bash
npm install responsive-logger
```

Alternatively, if you prefer using yarn:

```bash
yarn add responsive-logger
```

## Usage

Getting started with `responsive-logger` is simple. Just require it in your main project file:

```javascript
require('responsive-logger');
```

This single line of code initializes the logger and intercepts the `console` object, providing enhanced logging capabilities.

### Manual Production Mode Management

For those who prefer manual management of the production mode, the library offers flexibility. You can achieve this as follows:

```javascript
require('responsive-logger');
console.setConfig({
  isProduction: true, // Set production mode to true
});
console.initialized();
```

Additionally, you have the option to specify a file name and path for logging:

```javascript
require('responsive-logger');
console.setConfig({
  isProduction: true, // Set production mode to true
  logFilePath: "data/text.txt" // Specify file name and path
});
console.initialized();
```

Although `setConfig` is entirely optional, if used, `initialized` is mandatory. These functions allow precise control over the logger's behavior to align with your specific requirements.

---

With `responsive-logger`, logging becomes an effortless yet powerful aspect of your project. Whether in Node.js or the browser, manage your logs with ease and efficiency.