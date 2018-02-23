const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const cwd = process.cwd()
const webpackModules = path.join(__dirname, 'node_modules')
const outputPath = './dist/webpack'

process.env.NODE_ENV = 'development'

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // retainLines: true
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          {
            loader: 'style-loader',
            options: {
              // singleton: true,
              convertToAbsoluteUrls: true,
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              module: true
            }
          }
        ]
      }
    ].concat(files())
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html'
    }),
    new WriteFilePlugin()
  ],
  devtool: 'eval-source-map',
  resolve: {
    modules: ['node_modules', webpackModules]
  },
  resolveLoader: {
    modules: [webpackModules]
  },
  devServer: {
    // publicPath: 'http://localhost:3000',
    contentBase: path.resolve(outputPath),
  },
  output: {
    // publicPath: 'http://localhost:3000',
    path: path.resolve(outputPath),
    filename: 'index.js'
  }
}

function filesDist () {
  return [
    {
      test: /\.(png|jpe?g|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    },
    {
      test: /\.(ttf|eot)$/,
      loader: 'file-loader'
    },
    {
      // Match woff2 in addition to patterns like .woff?v=1.1.1.
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url-loader',
      options: {
        // Limit at 50k. Above that it emits separate files
        limit: 50000,
        // url-loader sets mimetype if it's passed.
        // Without this it derives it from the file extension
        mimetype: 'application/font-woff'
      }
    }
  ]
}

function files () {
  return [
    {
      test: /\.(png|jpe?g|gif)$/,
    },
    {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    },
    {
      test: /\.(ttf|eot)$/,
    }
  ].map(file => ({
    ...file,
    loader: 'file-loader'
  }))
}
