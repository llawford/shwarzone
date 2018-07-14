const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    game: './src/game.js',
  },
  output: {
    path: __dirname + '/public/dist',
    publicPath: 'dist/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve('public'),
  }
};
