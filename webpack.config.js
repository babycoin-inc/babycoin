const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "/client/src/index.tsx"),
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ['@babel/preset-react', '@babel/preset-env'] }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".tsx", ".ts"] },
  mode: 'development'
};