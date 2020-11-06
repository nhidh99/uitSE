import datetime
import random
import time

import mariadb

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


def get_questions():
    with open('../files/questions.txt') as f:
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
    all_questions = get_questions()

    for laptop_id in laptop_ids:
        question_count = random.randint(50, 500)
        questions = random.sample(all_questions, k=question_count)
        user_ids = random.sample(all_user_ids, k=question_count)
        dates = sorted([random_date("01-01-2015 12:00:00", "04-11-2020 00:00:00") for _ in range(question_count)])
        for question, uid, date in zip(questions, user_ids, dates):
            sql = 'INSERT INTO comment(user_id, laptop_id, question, comment_date, approve_status) ' \
                  'VALUES (%s, %s, %s, %s, true)'
            val = (uid, laptop_id, question, date)
            cursor.execute(sql, val)
        print('Added %d questions for laptop id %d' % (question_count, laptop_id))
    db.commit()


insert_db()
