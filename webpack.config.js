const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopytPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const BaseCSSExtract = new ExtractTextPlugin('base.css');
const ResetCSSExtract = new ExtractTextPlugin('reset.css');

const DIST = `${__dirname}/build/app`;
module.exports = {
  entry: './src/app/index.tsx',
  output: {
    filename: 'app.js',
    path: DIST,
    publicPath: '/'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss']
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'tsconfig.app.json'
        }
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

      {
        test: /reset.scss$/,
        use: ResetCSSExtract.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.(css|sass|scss)$/,
        exclude: [/reset\.scss/],
        use: BaseCSSExtract.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.(svg)/,
        loader: 'file-loader',
        options: {
        }
      },
      {
        test: /\.woff2?/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  },

  plugins: [
    ResetCSSExtract,
    BaseCSSExtract,
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new HtmlWebpackPlugin({
      "template": './src/app/index.html'
    }),
    new CopytPlugin([
      {from: './src/app/fonts', to : 'fonts/'}
    ])
  ]
};
