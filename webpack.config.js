const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env = {}) => {

  const { mode = 'development' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      'sass-loader'
    ]
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'public', 'index.html'),
      })
    ];
    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css'
        })
      );
    }

    return plugins;
  };

  return {
    mode: isProd ? 'production' : isDev && 'development',

    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      filename: isProd ? 'main-[hash:8].js' : undefined
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        assets: path.resolve(__dirname, 'src', 'assets'),
        actions: path.resolve(__dirname, 'src', 'actions'),
        components: path.resolve(__dirname, 'src', 'components'),
        containers: path.resolve(__dirname, 'src', 'containers'),
        models: path.resolve(__dirname, 'src', 'components', '_models'),
        reducers: path.resolve(__dirname, 'src', 'reducers'),
        middlewares: path.resolve(__dirname, 'src', 'middlewares'),
      },
    },
    module: {
      rules: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        // Loading sass/scss/css
        {
          test: /\.(sa|sc|c)ss$/,
          use: getStyleLoaders()
        },
        // Loading images
        {
          test: /\.(gif|png|jpe?g|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'img',
                name: '[name]-[sha1:hash:8].[ext]'
              }
            }
          ]
        },
        // Loading fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: getPlugins(),
    devServer: {
      open: true,
      historyApiFallback: true
    }
  };
};