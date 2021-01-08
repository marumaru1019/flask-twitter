import time

import pandas as pd
import redis
import os
from flask import *

from twitter import Tweepy

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)


# getのときの処理
@app.route('/', methods=['GET'])
def get():
	return render_template('index.html',
                        title='Twitter Getter(get)')


# postのときの処理
@app.route('/', methods=['POST'])
def post():
    key = request.form['key']
    since = request.form['since']
    until = request.form['until']
    items = request.form['items']
    tww = Tweepy()
    # リセットする
    df = pd.DataFrame(columns=['text',
                               'tweet_created_at',
                               'user_id',
                               'url',
                               'name',
                               "description",
                               "follow",
                               "follower",
                               "user_created_at"
                               ])

    df = tww.get_tweet(key,since,until,int(items))
    df.to_excel("tweet_sample.xlsx")
    return render_template('index.html',
                        title="処理完了")


# ファイルのダウンロード
@app.route("/downloadzip")
def downloadzip():
    response = make_response()
    response.data = open('tweet_sample.xlsx', "rb").read()
    response.headers['Content-Type'] = 'application/octet-stream'
    response.headers['Content-Disposition'] = 'attachment; filename=tweet_sample.xlsx'
    return response


## おまじない
if __name__ == "__main__":
    app.run()
