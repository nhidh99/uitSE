import datetime
import time

import mariadb
import requests
import random
import json

db = mariadb.connect(
    host="localhost",
    user="root",
    password="root",
    database="laptop_store"
)

cursor = db.cursor()


def get_laptop_ids():
    with open('../files/laptop_id.txt') as f:
        return [int(line[:-1]) for line in f]


def get_user_ids():
    sql = "SELECT id FROM user"
    cursor.execute(sql)
    return [int(x[0]) for x in cursor.fetchall()]


def get_ratings():
    with open('../files/rating_data.txt') as f:
        return [line[:-1] for line in f]


def random_date(start, end):
    frmt = '%d-%m-%Y %H:%M:%S'
    stime = time.mktime(time.strptime(start, frmt))
    etime = time.mktime(time.strptime(end, frmt))
    ptime = stime + random.random() * (etime - stime)
    dt = datetime.datetime.fromtimestamp(time.mktime(time.localtime(ptime)))
    return dt


def insert_db():
    laptop_ids = get_laptop_ids()
    all_user_ids = get_user_ids()
    all_ratings = get_ratings()

    for laptop_id in laptop_ids:
        rating_count = random.randint(5, 40)
        ratings = random.sample(all_ratings, k=rating_count)
        user_ids = random.sample(all_user_ids, k=rating_count)
        dates = sorted([random_date("01-01-2015 12:00:00", "04-11-2020 00:00:00") for _ in range(rating_count)])
        for rating, uid, date in zip(ratings, user_ids, dates):
            rating_splits = rating.split(' | ')
            point, detail = rating_splits[0], rating_splits[1]
            sql = 'INSERT INTO rating(user_id, laptop_id, point, detail, created_at, approve_status) ' \
                  'VALUES (%s, %s, %s, %s, %s, true)'
            val = (uid, laptop_id, point, detail, date)
            cursor.execute(sql, val)
        print('Added %d ratings for laptop id %d' % (rating_count, laptop_id))
    db.commit()


insert_db()