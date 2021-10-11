const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "../server/public/js"),
    filename: "index.js",
  },
  plugins: [new MiniCssExtractPlugin({ filename: "../css/style.css" })],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.png$/,
        loader: "file-loader",
        options: {
          outputPath: "../images/",
          name: "[name].[ext]?[hash]",
        },
      },
    ],
  },
  devtool: "source-map",
  mode: "development",
};
