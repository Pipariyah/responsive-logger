# responsive-logger

`responsive-logger` is a versatile logging library designed to work seamlessly in both Node.js and browser environments.

## Installation

You can install `responsive-logger` via npm:

```bash
npm install responsive-logger
```

or using yarn:

```bash
yarn add responsive-logger
```

## Usage

Using `responsive-logger` is straightforward. Simply require it in your main project file:

```javascript
require('responsive-logger');
```

This initializes the logger and intercepts the `console` object to provide enhanced logging capabilities.

### Manual Production Mode Management

If you prefer to manually manage the production mode, you can do so as follows:

```javascript
const console = require('responsive-logger');
console.initialized(true); // Set production mode to true
```

This allows you to control the behavior of the logger based on your specific requirements.

---
