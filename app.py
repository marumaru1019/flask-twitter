import time

import pandas as pd
import redis
import os
from flask import *

from twitter import Tweepy

app = Flask(__name__)


# getのときの処理
@app.route('/', methods=['GET'])
def get():
    return render_template('home.html',
                           title='HOW TO USE')

# getのときの処理


@app.route('/key', methods=['GET'])
def key():
    return render_template('twitter_get.html',
                           title='KEYWORD SEARCH')


# postのときの処理
@app.route('/twitter_get', methods=['POST'])
def post():
    key = request.form['key']
    since = request.form['since']
    until = request.form['until']
    volumes = request.form['volumes']
    print(key)
    print(since)
    print(until)
    print(volumes)
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

    df = tww.get_tweet(key, since, until, int(volumes))
    df.to_excel("tweet_sample.xlsx")
    return render_template('twitter_get.html',
                           title="Complete")


# ファイルのダウンロード
@app.route("/downloadzip")
def downloadzip():
    response = make_response()
    response.data = open('tweet_sample.xlsx', "rb").read()
    response.headers['Content-Type'] = 'application/octet-stream'
    response.headers['Content-Disposition'] = 'attachment; filename=tweet_sample.xlsx'
    return response


# おまじない
if __name__ == "__main__":
    # app.run(host='0.0.0.0', debug=True)
    app.run(debug=True, host='0.0.0.0',
            port=int(os.environ.get('PORT', 5000)))
