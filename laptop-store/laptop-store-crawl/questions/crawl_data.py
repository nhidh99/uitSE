import time

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

chrome_options = Options()
chrome_options.add_argument("--disable-notifications")
driver = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=chrome_options)


def crawl_questions():
    url = 'https://www.thegioididong.com/laptop/hp-348-g7-i5-9ph06pa'
    driver.get(url)
    wait = WebDriverWait(driver, 10)

    for i in range(1, 62):
        elems = driver.find_elements_by_class_name("question")
        for e in elems:
            print(e.text)
        link = driver.find_element_by_xpath("//a[contains(@onclick, 'listcomment(2,1,%d)')]" % (i + 1))
        link.click()
        time.sleep(3)


crawl_questions()
