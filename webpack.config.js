module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    game: './src/game.js',
  },
  output: {
    path: __dirname + '/dist',
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
      }
    ]
  }
};
