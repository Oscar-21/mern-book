const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/App.tsx'
  },
  devtool: "source-map",

 /* resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".json", "jsx"]
  },*/

  output: {
    path: './static',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
};
