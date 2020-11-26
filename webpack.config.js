const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
module.exports = (env = {}) => {
  const { mode = "development" } = env;

  const isProd = mode === "production";
  const isDev = mode === "development";

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: "SociAi",
        filename: "../index.html",
        template: "public/index.html",
      }),
    ];

    if (isProd)
      plugins.push(new MiniCssExtractPlugin({ filename: "main-[hash:8].css" }));

    return plugins;
  };

  return {
    mode: isProd ? "production" : isDev && "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist/sociai"),
      filename: isProd ? "main-[hash:8].js" : undefined,
      publicPath: "/sociai/",
    },

    module: {
      rules: [
        { test: /(resources).*\.html$/i, loader: "html-loader" },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        //loading images
        {
          test: /\.(png|jpg|gif|ico|jpeg|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },
        // loading fonts
        {
          test: /\.(ttf|otf|eof|woff|woff2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]",
              },
            },
          ],
        },
        //loading css
        {
          test: /\.css$/,
          use: getStyleLoaders(),
        },
        //loading sass
        {
          test: /\.s[ca]ss$/,
          use: [
            ...getStyleLoaders(),
            "sass-loader",
            {
              loader: "sass-resources-loader",
              options: {
                resources: ["./src/resources/vars.sass"],
              },
            },
          ],
        },
      ],
    },

    plugins: getPlugins(),

    devServer: {
      open: true,
      port: 8000,
      historyApiFallback: true,
      contentBase: "./",
      hot: true,
      openPage: "",
    },
  };
};
