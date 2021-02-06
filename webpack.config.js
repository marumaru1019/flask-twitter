const path = require("path");
const webpack = require("webpack");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js"); // 汎用設定をインポート

module.exports = merge(common, {
    // modeはproduction/developmentで記述
    // ""で囲むことに注意
    mode: "development",
    // どのファイルを読み込むか　default=> ./src/index.js
    entry: "./static/index.js",

    //　entryで読み込んだファイルのコンパイルの吐き出し場所
    // フロント開発時
    output: {
        path: path.resolve(__dirname, "templates"),
        // distにsample.jsというファイル名で吐き出し
        filename: "main.js",
    },
    devtool: "inline-source-map", // 開発用ソースマップ
    devServer: {
        contentBase: path.resolve(__dirname, "templates"),
        host: "0.0.0.0",
        hot: true,
        open: true,
        port: 9005,
    },
});
