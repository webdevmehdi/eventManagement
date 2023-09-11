const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageMeta = require('./package.json')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/main.jsx',

  resolve: {
    extensions: [ '.js', '.jsx' ]
  }
  ,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader' // will use .babelrc
      },
     /*  {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      } */
      {
        test: /\.css$/,
        use: ['style-loader' , 'css-loader']
      }, {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: ['url-loader?limit=100000'] }
    ]
  },devServer: {
    historyApiFallback: true,
  },
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: packageMeta.title
    })
  ]
}