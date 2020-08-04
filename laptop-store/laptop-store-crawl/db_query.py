import mariadb
import sys
import pandas as pd
import random
import re


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


def get_data():
    file_name = 'data.xlsx'
    sheet_name = 'Sheet1'
    df = pd.read_excel(file_name, sheet_name=sheet_name)
    return df.T.to_dict()


def insert_laptop(laptop):
    quantity = random.randint(0, 20)
    brand = laptop['Tên sản phẩm'].split()[0].upper()
    sql = "INSERT INTO laptop (id, name, brand, alt, avg_rating, " \
          "unit_price, discount_price, design, os, ports, sound_tech, size, weight, " \
          "wireless, webcam, sd_card, specials, quantity, record_status) VALUES " \
          "(%s, %s, %s, %s, 5.0, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 1)"
    val = (laptop['Mã sản phẩm'], laptop['Tên sản phẩm'], brand, laptop['Tên SEO'],
           laptop['Đơn giá'], laptop['Giảm giá'], laptop['Chất liệu'], laptop['Hệ điều hành'],
           laptop['Cổng giao tiếp'], laptop['Công nghệ âm thanh'], laptop['Kích thước'],
           float(laptop['Trọng lượng'].split()[0]), laptop['Kết nối không dây'], laptop['Webcam'],
           laptop['Khe đọc thẻ nhớ'], laptop['Tính năng khác'], quantity)
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

    sql = 'INSERT INTO monitor (size, resolution_type, resolution_width, resolution_height, technology)  ' \
          'VALUES (%s, %s, %s, %s, %s)'
    val = (size, res_type, res_width, res_height, technology)
    cursor.execute(sql, val)

    monitor_id = cursor.lastrowid
    sql = 'UPDATE laptop SET monitor_id = %s WHERE id = %s'
    val = (monitor_id, laptop['Mã sản phẩm'])
    cursor.execute(sql, val)


def insert_db():
    laptops = get_data()
    try:
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
                print('%d. Done: %s' % (i, laptop['Tên sản phẩm']))
            else:
                print('%d. Not allow: %s' % (i, laptop['Tên sản phẩm']))
        conn.commit()
    except mariadb.Error as e:
        print(e)
        conn.rollback()


insert_db()
