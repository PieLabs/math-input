const path = require('path');

module.exports = {
  entry: './entry.jsx',
  context: __dirname,
  output: {
    filename: './bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"]
  },
}