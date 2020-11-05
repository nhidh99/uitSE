import os
import random
import re
import sys

import mariadb
import pandas as pd
import requests


def config():
    try:
        conn = mariadb.connect(
            user="root",
            password="root",
            host="localhost",
            port=3306,
            database="laptop_store"
        )
        conn.autocommit = False
        return [conn, conn.cursor()]
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        sys.exit(1)


conn, cursor = config()
primary_image_path = 'laptops/edited/primary'
secondary_image_path = 'laptops/edited/secondary'
resolutions = [1000, 400, 150]
image_types = ['large_image', 'image', 'thumbnail']


def get_data():
    file_name = '../files/data.xlsx'
    sheet_name = 'Sheet1'
    df = pd.read_excel(file_name, sheet_name=sheet_name)
    return df.T.to_dict()


def get_promotion_data():
    file_name = '../files/data.xlsx'
    sheet_name = 'Sheet2'
    df = pd.read_excel(file_name, sheet_name=sheet_name)
    return df.T.to_dict()


def insert_laptop(laptop):
    quantity = random.randint(0, 20)
    brand = laptop['Tên sản phẩm'].split()[0].upper()
    sd_card = laptop['Khe đọc thẻ nhớ']
    specials = laptop['Tính năng khác']
    webcam = laptop['Webcam']

    sql = "INSERT INTO laptop (id, name, brand, alt, avg_rating, " \
          "unit_price, discount_price, design, os, ports, sound_tech, size, weight, " \
          "wireless, webcam, sd_cards, specials, quantity, record_status) VALUES " \
          "(%s, %s, %s, %s, 5.0, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 1)"
    val = (laptop['Mã sản phẩm'], laptop['Tên sản phẩm'], brand, laptop['Tên SEO'],
           laptop['Đơn giá'], laptop['Giảm giá'], laptop['Chất liệu'], laptop['Hệ điều hành'],
           laptop['Cổng giao tiếp'], laptop['Công nghệ âm thanh'], laptop['Kích thước'],
           float(laptop['Trọng lượng'].split()[0]), laptop['Kết nối không dây'],
           webcam if webcam != 'Không tích hợp' else None, sd_card if sd_card != 'Không' else None,
           specials if specials != 'Không' else None, quantity)
    cursor.execute(sql, val)


def insert_cpu(laptop):
    types = ['Intel Core i7', 'Intel Core i5', 'Intel Core i3', 'Intel Celeron', 'Intel Pentium', 'AMD']
    for t in types:
        tech = laptop['Công nghệ CPU']
        if tech.startswith(t):
            cpu_type = t.upper().replace(' ', '_')
            detail = (tech[len(cpu_type) + 1: len(tech)]
                      + (' ' + laptop['Loại CPU'] if laptop['Loại CPU'] != 'Hãng không công bố' else '')).lstrip()
            speed = float(laptop['Tốc độ CPU'].split()[0])
            max_speed = laptop['Tốc độ tối đa']

            sql = 'INSERT INTO cpu (type, detail, speed, max_speed) VALUES (%s, %s, %s, %s)'
            val = (cpu_type, detail, speed, max_speed if max_speed != 'Không' else None)
            cursor.execute(sql, val)

            cpu_id = cursor.lastrowid
            sql = 'UPDATE laptop SET cpu_id = %s WHERE id = %s'
            val = (cpu_id, laptop['Mã sản phẩm'])
            cursor.execute(sql, val)
            break


def insert_ram(laptop):
    type_params = laptop['Loại RAM'].split(' (')
    ram_type = type_params[0]
    d = type_params[1] if len(type_params) > 1 else None
    detail = d[0: len(d) - 1] if d is not None else None
    size = laptop['RAM'].split()[0]
    max_size = laptop['Hỗ trợ RAM tối đa'].split()[0]
    bus = laptop['Tốc độ Bus RAM'].split()[0]

    sql = 'INSERT INTO ram (size, max_size, type, bus, detail) VALUES (%s, %s, %s, %s, %s)'
    val = (size, max_size if max_size != 'Không' else None, ram_type, bus, detail)
    cursor.execute(sql, val)

    ram_id = cursor.lastrowid
    sql = 'UPDATE laptop SET ram_id = %s WHERE id = %s'
    val = (ram_id, laptop['Mã sản phẩm'])
    cursor.execute(sql, val)


def insert_hard_drive(laptop):
    summary, *detail_list = re.split(' GB | TB | GB,', laptop['Ổ cứng'])
    hd_type = summary.split()[0]
    size = int(summary.split()[1])
    detail = detail_list[0] if len(detail_list) > 0 else None

    sql = 'INSERT INTO hard_drive (type, size, detail) VALUES (%s, %s, %s)'
    val = (hd_type, size * 1024 if size < 32 else size, detail)
    cursor.execute(sql, val)

    hd_id = cursor.lastrowid
    sql = 'UPDATE laptop SET hard_drive_id = %s WHERE id = %s'
    val = (hd_id, laptop['Mã sản phẩm'])
    cursor.execute(sql, val)


def insert_monitor(laptop):
    size = laptop['Kích thước màn hình'].split()[0]
    res_params = laptop['Độ phân giải'].split(' (')
    res_type = res_params[0].replace('+', '_PLUS').replace(' ', '_').upper()
    res_size = [int(s) for s in res_params[1][:len(res_params[1]) - 1].split() if s.isdigit()]
    res_width = res_size[0]
    res_height = res_size[1]
    technology = laptop['Công nghệ màn hình']
    card_design = 'DISCRETE' if laptop['Thiết kế card'] == 'Card đồ họa rời' else 'INTEGRATED'
    graphics_card = laptop['Card đồ họa']

    sql = 'INSERT INTO monitor (size, resolution_type, resolution_width, ' \
          'resolution_height, technology, card_design, graphics_card)  ' \
          'VALUES (%s, %s, %s, %s, %s, %s, %s)'
    val = (size, res_type, res_width, res_height, technology, card_design, graphics_card)
    cursor.execute(sql, val)

    monitor_id = cursor.lastrowid
    sql = 'UPDATE laptop SET monitor_id = %s WHERE id = %s'
    val = (monitor_id, laptop['Mã sản phẩm'])
    cursor.execute(sql, val)


def insert_battery(laptop):
    battery_type = 'REMOVABLE' if laptop['Loại PIN'] == 'PIN rời' else 'NON_REMOVABLE'
    detail = laptop['Thông tin Pin']
    adapter = laptop['Model Adapter sạc']
    sql = 'INSERT INTO battery (type, detail, adapter) VALUES (%s, %s, %s)'
    val = (battery_type, detail, None if isinstance(adapter, float) else adapter)
    cursor.execute(sql, val)

    battery_id = cursor.lastrowid
    sql = 'UPDATE laptop SET battery_id = %s WHERE id = %s'
    val = (battery_id, laptop['Mã sản phẩm'])
    cursor.execute(sql, val)


def insert_primary_images(laptop):
    laptop_id = laptop['Mã sản phẩm']
    for res, img_type in zip(resolutions, image_types):
        dir_path = '%s/%s-%s/%d' % (primary_image_path, laptop['Mã sản phẩm'], laptop['Tên SEO'], res)
        file_path = os.path.join(dir_path, os.listdir(dir_path)[0])
        blob_value = open(file_path, 'rb').read()
        sql = 'UPDATE laptop SET ' + img_type + ' = %s WHERE id = %s'
        val = (blob_value, laptop_id)
        cursor.execute(sql, val)


def insert_secondary_images(laptop):
    laptop_id = laptop['Mã sản phẩm']
    dir_path = '%s/%s-%s' % (secondary_image_path, laptop['Mã sản phẩm'], laptop['Tên SEO'])
    files = os.listdir(dir_path + '/150')

    for file_name in files:
        blobs = []  # array follow by index: large, medium, thumbnail
        for res in resolutions:
            file_path = '%s/%d/%s' % (dir_path, res, file_name)
            blob_value = open(file_path, 'rb').read()
            blobs.append(blob_value)
        sql = 'INSERT INTO laptop_image (large_image, image, thumbnail, laptop_id) VALUES (%s, %s, %s, %s)'
        val = (blobs[0], blobs[1], blobs[2], laptop_id)
        cursor.execute(sql, val)


def insert_laptop_promotions(laptop):
    cursor.execute("SELECT id FROM promotion")
    result = [i[0] for i in cursor.fetchall()]
    num = random.choice(range(2, 4))
    promotion_ids = random.sample(result, num)
    for promotion_id in promotion_ids:
        sql = 'INSERT INTO laptop_promotion (laptop_id, promotion_id) VALUES (?, ?)'
        val = (laptop['Mã sản phẩm'], promotion_id)
        cursor.execute(sql, val)


def insert_tags(laptop):
    tags = ['OFFICE', 'TECHNICAL', 'LIGHTWEIGHT', 'GAMING', 'LUXURY']
    num = random.choice(range(2, 6))
    selected_tags = random.sample(tags, num)
    for tag in selected_tags:
        sql = 'INSERT INTO laptop_tag (laptop_id, tag) VALUES (?, ?)'
        val = (laptop['Mã sản phẩm'], tag)
        cursor.execute(sql, val)


def update_discount(laptop):
    percent = random.choice([5, 10])
    sql = 'UPDATE laptop SET discount_price = ? * (unit_price + 10000) / 100 WHERE id = ?'
    val = (percent if int(laptop['Đơn giá']) + 10000 >= 20_000_000 else percent + 5, laptop['Mã sản phẩm'])
    cursor.execute(sql, val)


def insert_laptops(laptops):
    for i in range(len(laptops)):
        laptop = laptops[i]
        brand = laptop['Tên sản phẩm'].split()[0].upper()
        allowed_brands = ['ACER', 'ASUS', 'DELL', 'HP', 'LENOVO', 'MACBOOK', 'MSI']
        if brand in allowed_brands:
            insert_laptop(laptop)
            insert_cpu(laptop)
            insert_ram(laptop)
            insert_hard_drive(laptop)
            insert_monitor(laptop)
            insert_primary_images(laptop)
            insert_secondary_images(laptop)
            insert_battery(laptop)
            insert_laptop_promotions(laptop)
            insert_tags(laptop)
            update_discount(laptop)
            print('%d. Done: %s' % (i, laptop['Tên sản phẩm']))
        else:
            print('%d. Not allow: %s' % (i, laptop['Tên sản phẩm']))


def insert_cities():
    url = 'https://raw.githubusercontent.com/nhidh99/uitSE/master/laptop-store/laptop-store-addresses/cities.json'
    response = requests.get(url)
    cities = response.json()['data']
    for city in cities:
        sql = 'INSERT INTO city (id, name) VALUES (?, ?)'
        val = (city['id'], city['name'])
        cursor.execute(sql, val)


def insert_districts():
    for i in range(278, 342):
        try:
            url = 'https://raw.githubusercontent.com/nhidh99/uitSE/master/laptop-store/laptop-store-addresses/districts/%s.json' % i
            response = requests.get(url)
            districts = response.json()['data']
            for district in districts:
                sql = 'INSERT INTO district (id, name, city_id) VALUES (?, ?, ?)'
                val = (district['id'], district['name'], i)
                cursor.execute(sql, val)
            print('%s. Done' % i)
        except:
            print('%s. Not found' % i)


def insert_wards():
    for i in range(1, 734):
        try:
            url = 'https://raw.githubusercontent.com/nhidh99/uitSE/master/laptop-store/laptop-store-addresses/wards/%s.json' % i
            response = requests.get(url)
            wards = response.json()['data']
            for ward in wards:
                sql = 'INSERT INTO ward (id, name, district_id) VALUES (?, ?, ?)'
                val = (ward['id'], ward['name'], i)
                cursor.execute(sql, val)
            print('%s. Done' % i)
        except:
            print('%s. Not found' % i)


def insert_locations():
    insert_cities()
    insert_districts()
    insert_wards()


def insert_promotions(promotions):
    for i in range(len(promotions)):
        promotion = promotions[i]
        quantity = random.randint(0, 20)
        dir_path = 'promotions/edited'
        file_path = os.path.join(dir_path, promotion['alt']) + '.jpg'
        blob_value = open(file_path, 'rb').read()
        sql = 'INSERT INTO promotion (name, price, quantity, alt, image, record_status) ' \
              'VALUES (?, ?, ?, ?, ?, 1)'
        val = (promotion['name'], promotion['price'], quantity, promotion['alt'], blob_value)
        cursor.execute(sql, val)
        print('%s. Inserted: %s' % (i, promotion['alt']))


def insert_db():
    laptops = get_data()
    # promotions = get_promotion_data()
    try:
        insert_laptops(laptops)
        # insert_promotions(promotions)
        # insert_locations()
        conn.commit()
    except mariadb.Error as e:
        print(e)
        conn.rollback()


insert_db()
