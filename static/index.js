// Bootstrapのスタイルシート側の機能を読み込む
// webpack.config.jsでcssを読み取れるようにへんこうを加える
import "bootstrap/dist/css/bootstrap.min.css";
// BootstrapのJavaScript側の機能を読み込む
import "bootstrap";

// fontawesomeを使う設定
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";

import "./scss/style.scss";

import "./js/import/range_form.js";
import "./js/component/form.js";
