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


def random_date(start, end):
    stime = start.timestamp()
    etime = end.timestamp()
    ptime = stime + random.random() * (etime - stime)
    dt = datetime.datetime.fromtimestamp(time.mktime(time.localtime(ptime)))
    return dt


def get_replies(filename):
    with open(filename) as f:
        output = []
        answer = ''
        for line in f:
            l = line[:-1]
            if l == '---':
                output.append(answer)
                answer = ''
            else:
                answer += l.rstrip() + '\n'
        return output


def get_user_ids():
    sql = "SELECT u.id FROM user u WHERE u.role != 'ADMIN'"
    cursor.execute(sql)
    return [int(x[0]) for x in cursor.fetchall()]


def get_question_data():
    sql = "SELECT q.id, q.created_at FROM question q"
    cursor.execute(sql)
    return [[int(x[0]), x[1]] for x in cursor.fetchall()]


def insert_answers():
    question_data = get_question_data()
    answers = get_replies('../files/answers.txt')
    for data in question_data:
        question_id, question_date = data[0], data[1]
        answer = random.choice(answers)
        answer_date = random_date(question_date, question_date + datetime.timedelta(minutes=29, seconds=59))
        sql = 'INSERT INTO question_reply (question_id, user_id, reply, created_at) ' \
              'VALUES (%s, %s, %s, %s)'
        val = (question_id, 20, answer, answer_date)
        cursor.execute(sql, val)
        answer_id = cursor.lastrowid
        sql = 'UPDATE question q SET answer_id = %s WHERE id = %s'
        val = (answer_id, question_id)
        cursor.execute(sql, val)
        print('inserted question %d with answer %d' % (question_id, answer_id))
    db.commit()


def insert_question_replies():
    question_data = get_question_data()
    user_ids = get_user_ids()
    replies = get_replies('../files/question_reply.txt')
    for data in question_data:
        question_id, question_date = data[0], data[1]
        q_replies = random.sample(replies, k=random.randint(0, 2))
        day = 1
        for reply in q_replies:
            user_id = random.choice(user_ids)
            reply_date = random_date(question_date,
                                      question_date + datetime.timedelta(days=day, minutes=59, seconds=59))
            sql = 'INSERT INTO question_reply (question_id, user_id, reply, created_at) ' \
                  'VALUES (%s, %s, %s, %s)'
            val = (question_id, user_id, reply, reply_date)
            cursor.execute(sql, val)
            day += 1
        print('inserted question %d with replies %s' % (question_id, q_replies))
    db.commit()


insert_question_replies()
