const path = require('path'),
      MiniCss = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/client/Index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCss.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new MiniCss({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
}