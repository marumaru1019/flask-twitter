const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin()


module.exports = smp.wrap({
  // modeはproduction/developmentで記述
  // ""で囲むことに注意
  mode: "development",
  // どのファイルを読み込むか　default=> ./src/index.js
  entry: './static/index.js',

  //　entryで読み込んだファイルのコンパイルの吐き出し場所
  // フロント開発時
  // output: {
  //   path: path.resolve(__dirname, 'templates'),
  //   // distにsample.jsというファイル名で吐き出し
  //   filename: 'main.js',
  // },

  // // flask実行時 → hot reloadが聞かない　→どうやらdevserverとoutputが同じ位置じゃないとだめらしい
  output: {
    path: path.resolve(__dirname, 'static/js'),
    // distにsample.jsというファイル名で吐き出し
    publicPath: '/js/',
    filename: 'main.js',
  },

  devServer: {
    contentBase: path.resolve(__dirname,"templates"),
    host: '0.0.0.0',
    hot : true,
    open : true,
    port: 9005
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // Sassファイルの読み込みとコンパイル
      {
        // 拡張子がsassとscssのファイルを対象とする
        test: /\.s[ac]ss$/i,
        // ローダー名
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
       // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
        // 画像をBase64として取り込む
        type: "asset/inline",
      }
      // bootstrapを読み取れるように追加
    ],
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  // target: ["web", "es5"],
});