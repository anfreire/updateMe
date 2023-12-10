from constants import COLORS, GLOBAL, PACKAGES, PATHS, Exceptions
from structs import APKInfo
from typing import List
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
        if macro not in PATHS.keys():
            raise Exceptions.InvalidMacro(macro)
        self.macro = macro
        self.get_apk(url)
        apkInfo = self.extract_apk(url)
        self.update_index(apkInfo)

    def get_apk(self, url: str):
        r = requests.get(url)
        with open(PATHS[self.macro], "wb") as apk:
            apk.write(r.content)
        apk = APK(PATHS[self.macro])
        if apk.package != PACKAGES[self.macro]:
            os.remove(PATHS[self.macro])
            raise Exceptions.InvalidPackage(self.macro, apk.package)

    def extract_apk(self, url: str):
        apk = APK(PATHS[self.macro])
        os.remove(PATHS[self.macro])
        return APKInfo(apk.version_name, url)

    def update_index(self, new: APKInfo):
        index = None
        with open(GLOBAL.INDEX_PATH, "r") as index_file:
            index = json.load(index_file)
        try:
            oldAPKInfo = APKInfo(
                index[self.macro]["version"], index[self.macro]["link"]
            )
        except:
            oldAPKInfo = APKInfo("", "")
        if oldAPKInfo == new:
            print(
                f"{COLORS.GREEN}Success{COLORS.RESET} No update for {COLORS.WHITE}{self.macro}{COLORS.RESET}"
            )
            return
        old_version = oldAPKInfo.version
        index[self.macro]["version"] = new.version
        index[self.macro]["link"] = new.link
        index_dump = json.dumps(index, indent=4)
        with open(GLOBAL.INDEX_PATH, "w") as index_file:
            index_file.write(index_dump)
        print(
            f"{COLORS.GREEN}Success{COLORS.RESET} Updated {COLORS.WHITE}{self.macro}{COLORS.RESET} from {COLORS.WHITE}{old_version}{COLORS.RESET} to {COLORS.WHITE}{new.version}{COLORS.RESET}"
        )


class WebScrapper:
    def __init__(self, selenium: bool = False):
        self.__driver = None if not selenium else self.init_selenium()

    @property
    def driver(self):
        if not self.__driver:
            raise Exception(
                f"{COLORS.RED}Error{COLORS.RESET} Selenium not initialized, specify {COLORS.WHITE}selenium=True{COLORS.RESET} in constructor"
            )
        return self.__driver

    def init_selenium(self) -> None:
        options = Options()
        options.headless = True
        return webdriver.Chrome(options=options)

    def quit_selenium(self) -> None:
        if self.__driver:
            self.__driver.quit()
            self.__driver = None

    def __del__(self):
        if self.__driver:
            self.__driver.quit()

    def get_selenium_tags(self, driver: webdriver.Chrome, tag: str) -> List[WebElement]:
        return driver.find_elements(By.XPATH, f"//{tag}")

    def get_urllib_tags(self, url: str, tag: str) -> ResultSet[PageElement]:
        page = urlopen(url)
        soup = BeautifulSoup(page, "html.parser")
        return soup.find_all(tag)


class GithubScrapping:
    def __init__(self, user: str, repo: str):
        self.user = user
        self.repo = repo
        self.scrapper = WebScrapper()

    @property
    def prefix(self):
        return f"https://github.com/{self.user}/{self.repo}"

    def getVersions(self) -> list:
        divs = self.scrapper.get_urllib_tags(f"{self.prefix}/releases", "div")
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
        lis = self.scrapper.get_urllib_tags(
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
