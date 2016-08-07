'use strict';

const path     = require( 'path' );
const settings = require( './config.js' ).config;
const webpack  = require( 'webpack' );

const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

let config = {
  devtool : '#eval-source-map',
  eslint  : {
    formatter : require( 'eslint-friendly-formatter' )
  },
  entry : {
    build : [ path.join( __dirname, 'app/src/main.js' ) ]
  },
  module : {
    preLoaders : [],
    loaders    : [
      {
        test   : /\.css$/,
        loader : ExtractTextPlugin.extract( 'style-loader', 'css-loader' )
      },
      {
        test   : /\.html$/,
        loader : 'vue-html-loader'
      },
      {
        test    : /\.js$/,
        loader  : 'babel',
        exclude : /node_modules/
      },
      {
        test   : /\.json$/,
        loader : 'json-loader'
      },
      {
        test   : /\.vue$/,
        loader : 'vue-loader'
      },
      {
        test   : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader : 'url-loader',
        query  : {
          limit : 10000,
          name  : 'imgs/[name].[hash:7].[ext]'
        }
      },
      {
        test   : /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader : 'url-loader',
        query  : {
          limit : 10000,
          name  : 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins : [
    new ExtractTextPlugin( 'styles.css' ),
    new HtmlWebpackPlugin( {
      excludeChunks : [ 'devtools' ],
      filename      : 'index.html',
      template      : './app/main.ejs',
      title         : settings.name
    } ),
    new webpack.NoErrorsPlugin()
  ],
  output : {
    filename : '[name].js',
    path     : path.join( __dirname, 'app/dist' )
  },
  resolve : {
    alias : {
      components : path.join( __dirname, 'app/src/components' ),
      src        : path.join( __dirname, 'app/src' )
    },
    extensions : [ '', '.js', '.vue', '.json', '.css' ],
    fallback   : [ path.join( __dirname, 'app/node_modules' ) ]
  },
  resolveLoader : {
    root : path.join( __dirname, 'node_modules' )
  },
  target : 'electron-renderer',
  vue    : {
    autoprefixer : {
      browsers : [ 'last 2 Chrome versions' ]
    },
    loaders : {
      sass : 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
      scss : 'vue-style-loader!css-loader!sass-loader'
    }
  },
  // TODO check this
  externals : [ 'app' ]
};

if ( process.env.NODE_ENV !== 'production' ) {
  /**
   * Apply ESLint
   */
  if ( settings.eslint ) {
    config.module.preLoaders.push(
      {
        test    : /\.js$/,
        loader  : 'eslint-loader',
        exclude : /node_modules|devtools/
      },
      {
        test   : /\.vue$/,
        loader : 'eslint-loader'
      }
    );
  }

  /**
   * Credits to
   * https://github.com/bradstewart/electron-boilerplate-vue/pull/17
   *
   * Apply vue-devtools window. Is ignored in production mode when building
   */
  if ( settings.vueDevTools ) {
    config.entry.build.unshift(
      path.join( __dirname, 'devtools/hook.js' ),
      path.join( __dirname, 'devtools/backend.js' )
    );

    config.entry.devtools = [
      path.join( __dirname, 'devtools/devtools.js' )
    ];

    config.plugins.push( new HtmlWebpackPlugin( {
      filename      : 'devtools.html',
      template      : path.join( __dirname, 'devtools/devtools.html' ),
      excludeChunks : [ 'build' ]
    } ) );
  }
}

/**
 * Adjust config for production settings
 */
if ( process.env.NODE_ENV === 'production' ) {
  config.devtool = '';

  config.plugins.push(
    new webpack.DefinePlugin( {
      'process.env.NODE_ENV' : '"production"'
    } ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin( {
      compress : {
        warnings : false
      }
    } )
  );
}

module.exports = config;
