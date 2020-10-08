import pandas as pd
import os
import urllib.request

def get_data():
    file_name = 'data.xlsx'
    sheet_name = 'Sheet2'
    df = pd.read_excel(file_name, sheet_name=sheet_name)
    return [list(df['alt']), list(df['link'])]


def get_images(alt, url):
    folder_name = 'promotions/raw'
    full_file_name = os.path.join(os.path.abspath(os.getcwd()), folder_name, alt) + '.jpg'
    urllib.request.urlretrieve(url, full_file_name)


def get_all_images():
    alts, links = get_data()
    for alt, link in zip(alts, links):
        print('Crawling: ' + str(alt))
        try:
            get_images(alt, link)
            print('Crawled: ' + alt)
        except:
            print('Failed: ' + alt)

get_all_images()
