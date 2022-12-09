const path = require('path');

module.exports = {
  entry: './src/practice.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'practice.js',
    path: path.resolve(__dirname, 'dist'),
  }
};

