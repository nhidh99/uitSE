from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

import time
import pandas as pd

driver = webdriver.Chrome(ChromeDriverManager().install())


def get_data():
    file_name = 'data.xlsx'
    sheet_name = 'Sheet1'
    df = pd.read_excel(file_name, sheet_name=sheet_name)
    return list(df['Tên sản phẩm'])


def get_url(key):
    driver.get("https://tiki.vn/laptop/c8095?src=c.8095.hamburger_menu_fly_out_banner")
    checkbox = driver.find_element_by_class_name('checkbox')
    checkbox.click()
    search = driver.find_element_by_name('q')
    search.send_keys(key)
    search.submit()
    item = driver.find_element_by_class_name('search-a-product-item')
    item.click()
    time.sleep(5)
    return driver.current_url.split('?')[0]


def print_urls():
    driver.get("https://tiki.vn/laptop/c8095?src=c.8095.hamburger_menu_fly_out_banner")
    time.sleep(5)
    cancel_button = driver.find_element_by_id('onesignal-slidedown-cancel-button')
    cancel_button.click()

    search_keys = get_data()
    for key in search_keys:
        print(get_url(key))


print(print_urls())
