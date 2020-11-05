import mariadb
import random

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


def build_random_location():
    city_id = random.randint(278, 341)
    while city_id == 298:
        city_id = random.randint(278, 341)
    districts = get_districts(city_id)
    district_id = random.choice(districts)
    wards = get_wards(district_id)
    ward_id = random.choice(wards)
    return city_id, district_id, ward_id


def insert_location(street, address_num, receiver_name, receiver_phone, user_id):
    city_id, district_id, ward_id = build_random_location()
    sql = "INSERT INTO address (address_num, street, ward_id, district_id, city_id, receiver_name, " \
          "receiver_phone, user_id, record_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, true)"
    val = (address_num, street, ward_id, district_id, city_id, receiver_name, receiver_phone, user_id)
    cursor.execute(sql, val)


def insert_db():
    streets = get_streets()
    names = get_names()
    user_ids = [int(x) for x in range(3852, 8851)]
    for user_id in user_ids:
        address_count = random.randint(1, 5)
        for i in range(address_count):
            receiver_phone = '0' + str(random.randint(100_000_000, 999_999_999))
            receiver_name = random.choice(names)
            street = random.choice(streets)
            address_num = random.randint(1, 301)
            insert_location(street, address_num, receiver_name, receiver_phone, user_id)
        print('Added %s addresses for user id %d' % (address_count, user_id))
    db.commit()


insert_db()