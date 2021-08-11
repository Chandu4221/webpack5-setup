const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ProvidePlugin } = require("webpack");
const Data = require(path.resolve(__dirname, "src/data/data.json"));

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve(__dirname, "src/js/script.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[contenthash].js",
    clean: true,
  },
  // dev server
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
    overlay: true,
    watchContentBase: true,
    open: true,
  },
  // loaders
  module: {
    rules: [
      // ejs
      {
        test: /\.ejs$/,
        loader: "ejs-compiled-loader",
      },
      // css
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                includePaths: ["./node_modules"],
              },
              sourceMap: true,
            },
          },
        ],
      },
      // js
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  // plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "!!ejs-compiled-loader!./src/index.ejs",
      filename: "index.html",
      title: "Webpack 5 Setup",
      data: Data,
    }),
    new ProvidePlugin({
      _: "underscore",
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
  ],
};
