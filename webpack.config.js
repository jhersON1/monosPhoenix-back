const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
      externals: {
    pg: 'commonjs pg',
    typeorm: 'commonjs typeorm',
  },
    optimization: {
      ...options.optimization,
    //   minimize: true,
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