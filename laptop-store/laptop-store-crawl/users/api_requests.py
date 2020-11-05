import requests
import random


def get_names():
    with open('user.txt') as f:
        return [line[:-1] for line in f]


def create_user_registration(user_fullname, user_count):
    try:
        headers = {"Content-Type": "application/json"}
        username = 'user' + str(user_count)
        password = confirm = username + 'password'
        email = username + '@gmail.com'
        data_json = {"username": username,
                     "password": password,
                     "confirm": confirm,
                     "name": user_fullname,
                     "email": email,
                     "phone": "0" + str(random.randint(100_000_000, 1_000_000_000)),
                     "gender": random.choice(['MALE', 'FEMALE', 'OTHER'])}
        requests.post(url='http://localhost:8081/api/auth/register',
                      json=data_json,
                      headers=headers)
    except:
        print('fail')


def insert_db():
    names = get_names()
    counts = random.choices([i for i in range(10000, 99999)], k=5000)
    for (name, count) in zip(names, counts):
        create_user_registration(name, count)

insert_db()
