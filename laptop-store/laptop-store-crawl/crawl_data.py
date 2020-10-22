import re
import requests
import pandas as pd
import codecs
import unicodedata
from bs4 import BeautifulSoup


def slugify(value):
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub('[^\w\s-]', '', value).strip().lower()
    return re.sub('[-\s]+', '-', value).replace(' ', '-')


def get_params(product_id):
    spec_url = 'https://www.thegioididong.com/aj/ProductV4/GetFullSpec/'
    response = requests.post(spec_url, data={'productId': product_id})
    spec_html = response.json()['spec']

    soup = BeautifulSoup(spec_html, features="html.parser")
    keys, values = soup.find_all("span"), soup.find_all("div")
    cleaner = re.compile('<.*?>')
    output = dict()

    for k, v in zip(keys, values):
        key = re.sub(cleaner, '', k.text.strip())
        val = re.sub(cleaner, '', v.text.strip())
        output[key] = val
    return output


def get_data():
    file_name = "data-tgdd.html"
    file = codecs.open(file_name, 'r', 'utf-8')
    html = file.read()
    file.close()

    soup = BeautifulSoup(html, features="html.parser")
    id_tags = soup.select("li", {'class': 'item laptop'})
    url_tags = soup.select("li > a", {'class': 'item laptop'})
    name_tags = soup.select("li > a > h3")
    price_tags = soup.select("div[class='price'] > strong");

    ids = list(map(lambda i: i.get('data-productid'), id_tags))
    urls = list(map(lambda u: u.get('href'), url_tags))
    names = list(map(lambda n: n.text, name_tags))
    prices = list(map(lambda p: int(''.join(filter(str.isdigit, p.text))), price_tags))
    return [ids, names, urls, prices]


def build_excel():
    laptops = []
    id_key = "Mã sản phẩm"
    name_key = 'Tên sản phẩm'
    seo_key = 'Tên SEO'
    price_key = 'Đơn giá'
    discount_key = 'Giảm giá'
    ids, names, urls, prices = get_data()
    count = 0

    for id, name, url, price in zip(ids, names, urls, prices):
        try:
            count += 1
            data = dict()
            data[id_key] = id
            data[name_key] = name
            data[seo_key] = slugify(name)
            data[price_key] = price
            data[discount_key] = (price + 10_000) * 0.1
            data = {**data, **get_params(id)}
            laptops.append(data)
            print('%d. Crawled: %s' % (count, name))
        except:
            print('%d. Error: %s' % (count, name))
            continue

    df = pd.DataFrame.from_dict(laptops)
    df.to_excel('data.xlsx', index_label="STT")


build_excel()
