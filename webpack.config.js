const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (options) {
  return {
    ...options,
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    optimization: {
      ...options.optimization,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true, // Vital para TypeORM
            keep_fnames: true,     
          },
        }),
      ],
    },
  };
};