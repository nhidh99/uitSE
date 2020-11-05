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


def get_districts(city_id):
    sql = "SELECT id FROM district WHERE city_id = " + str(city_id)
    cursor.execute(sql)
    return [int(x[0]) for x in cursor.fetchall()]


def get_wards(district_id):
    sql = "SELECT id FROM ward WHERE district_id = " + str(district_id)
    cursor.execute(sql)
    return [int(x[0]) for x in cursor.fetchall()]


def get_streets():
    with open('../files/street.txt') as f:
        return [line[:-1] for line in f]


def get_names():
    with open('../files/user.txt') as f:
        return [line[:-1] for line in f]


def get_usernames():
    sql = "SELECT u.username FROM user u WHERE u.username > 'user8938'"
    cursor.execute(sql)
    data = cursor.fetchall()
    return [x[0] for x in data]


def get_user_address_ids(username):
    sql = "SELECT a.id FROM address a JOIN user u on a.user_id = u.id WHERE u.username = '%s'" % username
    cursor.execute(sql)
    return [int(x[0]) for x in cursor.fetchall()]


def get_laptop_ids():
    with open('../files/laptop_id.txt') as f:
        return [[int(x) for x in line.split()][0] for line in f]


def build_random_cart():
    laptop_ids = get_laptop_ids()
    item_ids = random.sample(laptop_ids, k=random.randint(1, 6))
    cart = {}
    for item_id in item_ids:
        cart[item_id] = random.randint(1, 4)
    return cart


def build_random_location():
    city_id = random.randint(278, 341)
    while city_id == 298:
        city_id = random.randint(278, 341)
    districts = get_districts(city_id)
    district_id = random.choice(districts)
    wards = get_wards(district_id)
    ward_id = random.choice(wards)
    return city_id, district_id, ward_id


def get_access_token(username):
    url = 'http://localhost:8081/api/auth/login'
    data = {"username": username, "password": username + "password"}
    headers = {"Content-Type": "application/json"}
    return requests.post(url=url, json=data, headers=headers).headers['x-access-token']


def create_user_cart(access_token, address_id):
    headers = {"Authorization": 'Bearer ' + access_token, "Content-Type": "application/json"}
    data_json = {"cartJSON": json.dumps(build_random_cart())}
    requests.put(url='http://localhost:8081/api/users/me/cart',
                 json=data_json, headers=headers)
    requests.post(url='http://localhost:8081/api/orders',
                  json={"addressId": address_id},
                  headers=headers)


def insert_db():
    try:
        usernames = get_usernames()
        for username in usernames:
            access_token = get_access_token(username)
            address_ids = get_user_address_ids(username)
            for i in range(20):
                address_id = random.choice(address_ids)
                create_user_cart(access_token, address_id)
            print('Added orders for user id %s' % username)
    except:
        print('fail')


def modify_addresses():
    names = get_names()
    streets = get_streets()
    sql = "SELECT o.id FROM `order` o WHERE o.user_id"
    cursor.execute(sql)
    order_ids = [int(x[0]) for x in cursor.fetchall()]
    for order_id in order_ids:
        city_id, district_id, ward_id = build_random_location()
        receiver_name = random.choice(names)
        receiver_phone = '0' + str(random.randint(100_000_000, 999_999_999))
        street = random.choice(streets)
        address_num = random.randint(1, 300)
        sql = 'UPDATE `order` o SET o.address_num = ?, o.street = ?, o.ward_id = ?, ' \
              'o.district_id = ?, o.city_id = ?, o.receiver_name = ?, o.receiver_phone = ? ' \
              'WHERE o.id = ?'
        val = (address_num, street, ward_id, district_id, city_id, receiver_name, receiver_phone, order_id)
        cursor.execute(sql, val)
        print('Modified order ' + str(order_id))
    db.commit()


def random_date(start, end):
    frmt = '%d-%m-%Y %H:%M:%S'
    stime = time.mktime(time.strptime(start, frmt))
    etime = time.mktime(time.strptime(end, frmt))
    ptime = stime + random.random() * (etime - stime)
    dt = datetime.datetime.fromtimestamp(time.mktime(time.localtime(ptime)))
    return dt


def add_working_days(start_date, added_days):
    days_elapsed = 0
    while days_elapsed < added_days:
        test_date = start_date + datetime.timedelta(days=1)
        start_date = test_date
        if test_date.weekday() > 4:
            continue
        else:
            days_elapsed += 1
    return start_date


def modify_created_date():
    sql = "SELECT o.id FROM `order` o WHERE o.user_id ORDER BY o.id"
    cursor.execute(sql)
    order_ids = [int(x[0]) for x in cursor.fetchall()]
    dates = []
    start_date = '01-01-2015 00:00:00'
    end_date = '04-11-2020 00:00:00'
    for i in range(len(order_ids)):
        dates.append(random_date(start_date, end_date))
    dates.sort()
    for (order_id, date) in zip(order_ids, dates):
        order_sql = 'UPDATE `order` o SET o.order_date = ?, o.delivery_date = ? WHERE o.id = ?'
        track_sql = 'UPDATE `order_track` t SET t.created_at = ? WHERE t.order_id = ?'
        order_value = date, add_working_days(date, 3), order_id
        track_value = date, order_id
        cursor.execute(order_sql, order_value)
        cursor.execute(track_sql, track_value)
        print('Modified order %d with %s' % (order_id, date))
    db.commit()


def insert_received_track():
    sql = "SELECT o.id FROM `order` o ORDER BY o.id"
    cursor.execute(sql)
    data = cursor.fetchall()
    order_ids = [int(x[0]) for x in data]
    order_ids = random.sample(order_ids, k=95_000)
    order_ids.sort()
    i = 1

    for order_id in order_ids:
        sql = "SELECT t.created_at FROM order_track t WHERE t.status = 'PENDING' AND t.order_id = ? LIMIT 1"
        val = (order_id,)
        cursor.execute(sql, val)
        created_at = cursor.fetchone()[0]
        created_at += datetime.timedelta(minutes=random.randint(15, 59), seconds=random.randint(0, 59))

        sql = 'INSERT INTO `order_track` (status, created_at, order_id) VALUES (?, ?, ?)'
        val = ('RECEIVED', created_at, order_id)
        cursor.execute(sql, val)

        print('%d. Added received track for order %s at %s' % (i, order_id, created_at))
        i += 1
    db.commit()


def insert_packaged_track():
    sql = "SELECT t.order_id, t.created_at FROM `order_track` t WHERE t.status = 'RECEIVED' ORDER BY t.order_id"
    cursor.execute(sql)
    data = cursor.fetchall()
    order_pairs = [(int(x[0]), x[1]) for x in data]
    order_pairs = sorted(random.sample(order_pairs, k=93000), key=lambda x: x[0])
    i = 1

    for order_pair in order_pairs:
        order_id = order_pair[0]
        created_at = order_pair[1]
        created_at += datetime.timedelta(hours=random.randint(6, 23),
                                         minutes=random.randint(0, 59),
                                         seconds=random.randint(0, 59))

        sql = 'INSERT INTO `order_track` (status, created_at, order_id) VALUES (?, ?, ?)'
        val = ('PACKAGED', created_at, order_id)
        cursor.execute(sql, val)

        print('%d. Added packaged track for order %s at %s' % (i, order_id, created_at))
        i += 1
    db.commit()


def insert_delivering_track():
    sql = "SELECT t.order_id, t.created_at FROM `order_track` t WHERE t.status = 'PACKAGED' ORDER BY t.order_id"
    cursor.execute(sql)
    data = cursor.fetchall()
    order_pairs = [(int(x[0]), x[1]) for x in data]
    order_pairs = sorted(random.sample(order_pairs, k=92000), key=lambda x: x[0])
    i = 1

    for order_pair in order_pairs:
        order_id = order_pair[0]
        created_at = order_pair[1]
        created_at += datetime.timedelta(
            hours=random.randint(6, 10),
            minutes=random.randint(0, 59),
            seconds=random.randint(0, 59))

        sql = 'INSERT INTO `order_track` (status, created_at, order_id) VALUES (?, ?, ?)'
        val = ('DELIVERING', created_at, order_id)
        cursor.execute(sql, val)

        print('%d. Added delivering track for order %s at %s' % (i, order_id, created_at))
        i += 1
    db.commit()


def insert_delivered_track():
    sql = "SELECT t.order_id, t.created_at FROM `order_track` t WHERE t.status = 'DELIVERING' ORDER BY t.order_id"
    cursor.execute(sql)
    data = cursor.fetchall()
    order_pairs = [(int(x[0]), x[1]) for x in data]
    order_pairs = sorted(random.sample(order_pairs, k=91500), key=lambda x: x[0])
    i = 1

    for order_pair in order_pairs:
        order_id = order_pair[0]
        created_at = order_pair[1]
        created_at = add_working_days(created_at, 1)
        created_at += datetime.timedelta(
            hours=random.randint(0, 14),
            minutes=random.randint(0, 59),
            seconds=random.randint(0, 59))

        sql = 'INSERT INTO `order_track` (status, created_at, order_id) VALUES (?, ?, ?)'
        val = ('DELIVERED', created_at, order_id)
        cursor.execute(sql, val)

        print('%d. Added delivered track for order %s at %s' % (i, order_id, created_at))
        i += 1
    db.commit()


def insert_canceled_track():
    sql = "SELECT ot.order_id FROM order_track ot GROUP BY ot.order_id HAVING count(*) < 5"
    cursor.execute(sql)
    data = cursor.fetchall()
    order_ids = [int(x[0]) for x in data]
    i = 1

    for order_id in order_ids:
        sql = "SELECT ot.created_at FROM order_track ot WHERE ot.order_id = ? ORDER BY ot.id DESC LIMIT 1"
        val = (order_id,)
        cursor.execute(sql, val)
        created_at = cursor.fetchone()[0]
        created_at += datetime.timedelta(minutes=random.randint(0, 9), seconds=random.randint(15, 59))
        sql = 'INSERT INTO `order_track` (status, created_at, order_id) VALUES (?, ?, ?)'
        val = ('CANCELED', created_at, order_id)
        cursor.execute(sql, val)

        print('%d. Added canceled track for order %s at %s' % (i, order_id, created_at))
        i += 1
    db.commit()

# insert_packaged_track()
# insert_delivering_track()
# insert_delivered_track()
# insert_canceled_track()
