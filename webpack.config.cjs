// webpack.config.cjs 
const path = require('path');

module.exports = {
  entry: './frontend/scripts/personInteractions.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "fs": false,
      "timers": require.resolve("timers-browserify"),
      "dns": false,
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "net": false,
      "tls": false,
      "os": require.resolve("os-browserify/browser"),
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve("assert/"),
      "querystring": require.resolve("querystring-es3")
    }
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
};
