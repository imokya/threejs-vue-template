const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config.json')

module.exports = {
  mode: 'development',

  entry: {
    app: path.resolve(__dirname, '../src/app.js')
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js?[contenthash]'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },

  module: {
    rules: [

      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },

      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 
          }
        },
        generator: {
          filename: 'img/[name][ext]'
        }
      },

      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      minify: false,
      inject: 'body',
      title: config.title,
      publicPath: config.publicPath
    })
  ]

}