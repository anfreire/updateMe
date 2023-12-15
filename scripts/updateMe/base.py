from constants import COLORS, GLOBAL, MACROS
from structs import APKInfo
from typing import List
from index import IndexManager
from selenium.webdriver.remote.webelement import WebElement
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from pyaxmlparser import APK
from bs4.element import PageElement
from bs4.element import ResultSet
from urllib.request import urlopen
from bs4 import BeautifulSoup
import os
import json
import requests
import re


class AppBase:
    def __init__(self, macro: str, url: str):
        if macro not in MACROS.get_col():
            raise Exception(
                f"[ {COLORS.RED}FAIL {COLORS.RESET}] Invalid macro {COLORS.WHITE}{macro}{COLORS.RESET}"
            )
        self.macro = macro
        self.index = IndexManager.get_index(macro)
        apkInfo = self.get_apk(url)
        self.update_index(apkInfo)

    def get_apk(self, url: str) -> APKInfo:
        r = requests.get(url)
        with open(GLOBAL.CURR_APP, "wb") as apk:
            apk.write(r.content)
        apk = APK(GLOBAL.CURR_APP)
        os.remove(GLOBAL.CURR_APP)
        if apk.package != self.index.packageName:
            raise Exception(
                f"[ {COLORS.RED}FAIL {COLORS.RESET}] Package name mismatch. Expected {COLORS.WHITE}{self.index.packageName}{COLORS.RESET} but got {COLORS.WHITE}{apk.package}{COLORS.RESET}"
            )
        return APKInfo(apk.version_name, url)

    def update_index(self, new: APKInfo):
        if (self.index.version == new.version) and (self.index.link == new.link):
            print(
                f"[  {COLORS.GREEN}OK  {COLORS.RESET}] There is no update for {COLORS.WHITE}{self.index.title}{COLORS.RESET}"
            )
            return
        old_version = self.index.version
        self.index.version = new.version
        self.index.link = new.link
        IndexManager.update_index(self.macro, self.index)
        print(
            f"[  {COLORS.GREEN}OK  {COLORS.RESET}] Updated {COLORS.WHITE}{self.index.title}{COLORS.RESET} from {COLORS.WHITE}{old_version}{COLORS.RESET} to {COLORS.WHITE}{new.version}{COLORS.RESET}"
        )


class WebScrapper:
    def __init__(self):
        self.__driver = self.get_driver()

    @property
    def driver(self) -> webdriver.Chrome:
        return self.__driver

    def get_driver(self) -> None:
        extension =  r"/home/anfreire/Documents/Projects/Android/updateMe/scripts/updateMe/extensions/1.54.0_0"
        options = Options()
        options.headless = True
        options.add_argument("load-extension=" + extension)
        driver = webdriver.Chrome(options=options)
        return driver

    def open_link(self, link: str) -> None:
        self.driver.get(link)

    def __del__(self):
        self.driver.quit()

    def get_tags(self, tag: str) -> List[WebElement]:
        return self.driver.find_elements(By.XPATH, f"//{tag}")


class GithubScrapping:
    def __init__(self, user: str, repo: str):
        self.user = user
        self.repo = repo

    def get_urllib_tags(self, url: str, tag: str) -> ResultSet[PageElement]:
        page = urlopen(url)
        soup = BeautifulSoup(page, "html.parser")
        return soup.find_all(tag)

    @property
    def prefix(self):
        return f"https://github.com/{self.user}/{self.repo}"

    def getVersions(self) -> list:
        divs = self.get_urllib_tags(f"{self.prefix}/releases", "div")
        versions = list()
        for div in divs:
            if div.find("svg", attrs={"aria-label": "Tag"}) and div.find("span"):
                try:
                    text = div.find("span").text
                    text = re.sub(r"\s+", "", text)
                    if (
                        text == self.user
                        or text == self.repo
                        or text is None
                        or len(text) == 0
                        or text in versions
                    ):
                        continue
                    versions.append(text)
                except:
                    continue
        return versions

    def link(self, version: str, include: List[str] = [], exclude: List[str] = []):
        lis = self.get_urllib_tags(
            f"{self.prefix}/releases/expanded_assets/{version}", "li"
        )
        links = []
        for li in lis:
            div = li.find("div")
            if div and div.find("svg") and div.find("a"):
                href = div.find("a").get("href")
                if (
                    href
                    and len(href) != 0
                    and all(term in href for term in include)
                    and all(term not in href for term in exclude)
                ):
                    link = (
                        href
                        if href.startswith("https://")
                        else "https://github.com/" + href
                    )
                    if link not in links:
                        links.append(link)
        return links


class AeroScrapping:
    def __init__(self) -> None:
        self.driver = WebScrapper()

    def open_link(self, link: str) -> None:
        self.driver.open_link(link)

    def searchLinkByText(self, text: str) -> str:
        link = None
        _as = self.driver.get_tags("a")
        for a in _as:
            if a.get_attribute("href") and text.lower() in a.text.lower():
                link = a.get_attribute("href")
                break
        if link:
            return link
        raise Exception(
            f"[ {COLORS.RED}FAIL {COLORS.RESET}] Link not found. Trying to search link with text {COLORS.WHITE}{text}{COLORS.RESET}"
        )

    def findLinkByText(self, text: str) -> str:
        link = None
        _as = self.driver.get_tags("a")
        for a in _as:
            if a.get_attribute("href") and a.text == text:
                link = a.get_attribute("href")
                break
        if link:
            return link
        raise Exception(
            f"[ {COLORS.RED}FAIL {COLORS.RESET}] Link not found. Trying to find link with text {COLORS.WHITE}{text}{COLORS.RESET}"
        )

    def click_span(self, class_attr: str) -> None:
        span = self.driver.get_tags("span")
        clicked = False
        for s in span:
            if s.get_attribute("class") == class_attr:
                clicked = True
                s.click()
                break
        if not clicked:
            raise Exception(
                f"[ {COLORS.RED}FAIL {COLORS.RESET}] Span not found. Trying to find span with class {COLORS.WHITE}{class_attr}{COLORS.RESET}"
            )

    def find_link_that_ends_width(self, endswith: str) -> str:
        link = None
        _as = self.driver.get_tags("a")
        for a in _as:
            if a.get_attribute("href") and a.get_attribute("href").endswith(endswith):
                link = a.get_attribute("href")
                break
        if link:
            return link
        raise Exception(
            f"[ {COLORS.RED}FAIL {COLORS.RESET}] Link not found. Trying to find link that ends with {COLORS.WHITE}{endswith}{COLORS.RESET}"
        )
