const path = require("path");
const webpack = require("webpack");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = smp.wrap({
    // modeはproduction/developmentで記述
    // ""で囲むことに注意
    // mode: "development",
    // どのファイルを読み込むか　default=> ./src/index.js
    entry: "./static/index.js",

    devServer: {
        contentBase: path.resolve(__dirname, "templates"),
        host: "0.0.0.0",
        hot: true,
        open: true,
        port: 9005,
    },

    module: {
        rules: [
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

            // Sassファイルの読み込みとコンパイル
            {
                // 拡張子がsassとscssのファイルを対象とする
                test: /\.[s][ac]ss$/i,
                // ローダー名
                use: [
                    {
                        loader: "style-loader", // inject CSS to page
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS modules
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "./webfonts",
                            publicPath: "../webfonts",
                        },
                    },
                ],
            },
            // {
            //  // 対象となるファイルの拡張子
            //   test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
            //   // 画像をBase64として取り込む
            //   type: "asset/inline",
            // },
            // bootstrapを読み取れるように追加
        ],
    },
    // ES5(IE11等)向けの指定（webpack 5以上で必要）
    // target: ["web", "es5"],
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],
});
