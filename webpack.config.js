const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./src/App.jsx'],
    vendor: ['react','react-dom','whatwg-fetch', 'babel-polyfill', 'react-bootstrap'],
  },
  output: {
    path: __dirname + './static',
    filename: 'app.bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.bundle.js')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }
      },
    ]
  },
  devtool: 'source-map'
};
