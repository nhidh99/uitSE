import os
import urllib.request

import pandas as pd
import requests
from PIL import Image


def get_data():
    file_name = '../files/data.xlsx'
    sheet_name = 'Sheet1'
    df = pd.read_excel(file_name, sheet_name=sheet_name)
    return [list(df['Mã sản phẩm']), list(df['Tên SEO']), list(df['Link tiki'])]


def is_square_image(url):
    image = Image.open(urllib.request.urlopen(url))
    width, height = image.size
    return width == height


def get_images(id, alt, tiki_product_id):
    url = 'https://tiki.vn/api/v2/products/' + tiki_product_id + '?include=images'
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
    data = requests.get(url, headers=headers).json()
    folder_name = 'laptops/raw/%s-%s' % (id, alt)
    images = data['images']

    os.mkdir(folder_name)
    count = 0
    for i in images:
        count += 1
        url = i['large_url']
        if is_square_image(url):
            file_name = str(count) + '-' + url.split('/')[-1]
            full_file_name = os.path.join(os.path.abspath(os.getcwd()), folder_name, file_name)
            urllib.request.urlretrieve(url, full_file_name)


def get_all_images():
    ids, alts, links = get_data()
    for id, alt, link in zip(ids, alts, links):
        print('Crawling: ' + str(id))
        tiki_product_id = link.split('-')[-1].replace('.html', '')[1:]
        try:
            get_images(id, alt, tiki_product_id)
            print('Crawled: ' + alt)
        except:
            print('Failed: ' + tiki_product_id)


get_all_images()
