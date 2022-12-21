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
        // test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ['@babel/preset-react', '@babel/preset-env'] }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", ".tsx", ".ts"] },
  mode: 'development'
};