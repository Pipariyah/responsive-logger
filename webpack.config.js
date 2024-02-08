const TerserPlugin = require('terser-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js', // Assuming your entry file is src/index.js
  output: {
    filename: 'responsive-loger.js',
    path: path.resolve(__dirname, 'dist'),
  },
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
