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
    mode: "production",
    // どのファイルを読み込むか　default=> ./src/index.js
    entry: "./static/index.js",
    // node実行時 → hot reloadが聞かない　→どうやらdevserverとoutputが同じ位置じゃないとだめらしい
    output: {
        path: path.resolve(__dirname, "static"),
        // distにsample.jsというファイル名で吐き出し
        filename: "main.js",
    },
});
