const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.join(__dirname, "/client/src/index.jsx"),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.join(__dirname, "/client/dist"),
    filename: "bundle.js"
  },
  mode: 'development'
};