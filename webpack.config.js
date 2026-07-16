const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = function (options) {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
  ];

  return {
    ...options,
    externals: [], // Asegura que todo vaya al bundle
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...options.plugins,
      // 1. Ignora módulos opcionales de NestJS
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
      // 2. NUEVO: Ignora pg-native para que el driver de Postgres no falle al compilar
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$/,
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