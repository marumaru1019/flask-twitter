import tweepy as tw
import pandas as pd
import time
import os

class Tweepy:

    def __init__(self):

        # API ユーザー情報
        self.consumer_key = os.environ['consumer_key']
        # Consumer Secret
        self.consumer_secret = os.environ['consumer_secret']
        self.access_token = os.environ['access_token']
        # Accesss Token Secert
        self.access_token_secret = os.environ['access_token_secret']
        auth = tw.OAuthHandler(self.consumer_key, self.consumer_secret)
        auth.set_access_token(self.access_token, self.access_token_secret)
        self.api = tw.API(auth, wait_on_rate_limit=True)

    # keyword検索
    # '%Y-%m-%d_00:00:00_JST' format for until & since
    def get_tweet(self, search_word, since, until,
                  items,
                  list_text=[],
                  list_tweet_created_at=[],
                  list_id=[],
                  list_name=[],
                  list_url=[],
                  list_description=[],
                  list_follow=[],
                  list_follower=[],
                  list_user_created_at=[]):
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
        tweets = tw.Cursor(self.api.search,
                           q=search_word,
                           lang="ja",
                           tweet_mode="expanded",
                           result_type="mixed",
                           since=since,
                           until=until
                           ).items(items)

        j = 1
        print("{}盤面を進行中".format(j))
        for tweet in tweets:
            list_text.append(tweet.text)
            list_tweet_created_at.append(tweet.created_at)
            list_id.append(tweet.user.screen_name)
            list_name.append(tweet.user.name)
            list_url.append("https://twitter.com/"+tweet.user.screen_name)
            list_description.append(tweet.user.description)
            list_follow.append(tweet.user.friends_count)
            list_follower.append(tweet.user.followers_count)
            list_user_created_at.append(tweet.user.created_at)
        j += 1



        df_new = df.assign(text=list_text,
                           tweet_created_at=list_tweet_created_at,
                           user_id=list_id,
                           name=list_name,
                           url=list_url,
                           description=list_description,
                           follow=list_follow,
                           follower=list_follower,
                           user_created_at=list_user_created_at
                           )

        print(df_new)
        return df_new
