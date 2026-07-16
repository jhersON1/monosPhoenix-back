const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = function (options) {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
  ];

  return {
    ...options,
    externals: ['pg'], 
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
    optimization: {
      ...options.optimization,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true, 
            keep_fnames: true,     
          },
        }),
      ],
    },
  };
};