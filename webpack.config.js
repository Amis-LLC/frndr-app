const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: [
    // entry point of our app
    "./client/index.js", //TBD until structure is determined...
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
  mode: process.env.NODE_ENV,
  devServer: {
    host: "localhost",
    port: 8080,
    // match the output path
    static: {
      directory: path.join(__dirname), // , "./dist"), // --> I don't think this is necessary for dev environment so I removed it. -Zahara
    },
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,

    headers: { "Access-Control-Allow-Origin": "*" },

    proxy: {
      "/": {
        target: "http://localhost:3000/",
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { targets: "defaults" }],
            ],
          },
        },
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: ["style-loader", "css-loader", "sass-loader"],
      // },
      {
        test: /.(css|s[a|c]ss)$/,
        include: [/client\/stylesheets\/modules/],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.s?[ac]ss$/i,
        exclude: [/node_modules/, /client\/stylesheets\/modules/], //is necessary???
        use: [
          // Creates `style` nodes from JS strings
          //"style-loader",
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          { loader: "css-loader", options: { url: false, sourceMap: true } },
          // Compiles Sass to CSS
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader", //possibly should be "use" instead of loader
      },
      {
        test: /\.(jpe?g|png)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[hash][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              pngquant: {
                quality: [0.9, 0.95], //reduce quality
              },
            },
          },
        ],
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
  ].concat(
    devMode
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: "style.css",
          }),
        ]
  ),
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: [".js", ".jsx"],
  },
};
