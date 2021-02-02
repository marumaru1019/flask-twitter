# 仕様
Docker :  20.10.2
docker-compose : 1.27.4
TwitterAPI の 各種キー

# 使いかた

ディレクトリが以下のような口座雨になっていることを確認して下さい。

```
.
├── app.py
├── docker-compose.yml
├── Dockerfile
├── open.sh
├── package.json
├── package-lock.json
├── requirements.txt
├── static
├── templates
├── twitter.py
├── webpack.common.js
├── webpack.config.js
└── webpack.prod.js
```

docker-compose.ymlにTwitterAPIの各種キーを入力して下さい。

(TwitterAPIのアクセストークン等の獲得は[こちらの記事](https://blog.palettecms.jp/article/20103)のダッシュボードから各種設定・取得を確認して下さい。)

```:docker-compose.yml
version: "3.9"
services:
  frontend:
    build:
      context: .
      dockerfile: ./Dockerfile
    tty: false
    environment:
      FLASK_DEBUG: 1
      FLASK_APP: ./app.py
      consumer_secret: {{TwitterAPIのカスタマーシークレット}} ←ここ
      consumer_key: {{TwitterAPIのカスタマーキー}}  ←ここ
      access_token_secret: {{TwitterAPIのアクセストークンシークレット}}　←ここ
      access_token: {{TwitterAPIのアクセストークン}}　←ここ

    volumes:
      - .:/code
    ports:
      - "5000:5000"
```

最後にターミナル上で以下のコマンドを入力して下さい。

```:ターミナル
sh open.sh
```

初回の起動には時間がかかりますが, 

