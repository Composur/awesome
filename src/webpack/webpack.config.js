const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: `[name].[contenthash].bundle.js`,
    filename: (pathData, assetInfo) => {
      console.log(pathData, '99999', assetInfo)
      return pathData.chunk.name === 'main' ? '[js/name].js' : '[name]/[name].js';
    },
  },
};