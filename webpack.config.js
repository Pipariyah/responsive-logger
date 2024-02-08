const TerserPlugin = require('terser-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/server.js', // Assuming your entry file is src/index.js
  output: {
    filename: 'responsive-loger.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node', // Target Node.js for the server-side bundle
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false, // Keep console.* statements
          },
          output: {
            comments: false, // Remove comments
          },
        },
      }),
    ],
  },
  plugins: [
    new WebpackObfuscator({
      rotateUnicodeArray: false,
    }),
  ],
};
