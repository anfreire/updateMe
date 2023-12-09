import re
import os
import json
import requests
import datetime
from pyaxmlparser import APK
from bs4 import BeautifulSoup
from dataclasses import dataclass
from urllib.request import urlopen
from abc import ABC, abstractmethod
from typing import List
from selenium.webdriver.remote.webelement import WebElement
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from bs4.element import PageElement
from bs4.element import ResultSet


@dataclass
class APKInfo:
    version: str
    link: str

    @property
    def toDict(self):
        return {"version": self.version, "link": self.link}

    def __eq__(self, other):
        return self.version == other.version and self.link == other.link


@dataclass
class AppInfo:
    package: str
    apkInfo: APKInfo

    @property
    def toDict(self):
        return {
            "package": self.package,
            "version": self.apkInfo.version,
            "link": self.apkInfo.link,
        }


class GLOBAL:
    ARCHIVE_DIR = "/home/anfreire/Documents/Projects/Android/updateMe/scripts"
    INDEX_PATH = ARCHIVE_DIR + "/index.json"
    ENV_PATH = ARCHIVE_DIR + "/env.json"


class DIRS:
    YOUTUBE = GLOBAL.ARCHIVE_DIR + "/youtube"
    SPOTIFY = GLOBAL.ARCHIVE_DIR + "/spotify"
    HDO = GLOBAL.ARCHIVE_DIR + "/hdo"
    INSTAGRAM = GLOBAL.ARCHIVE_DIR + "/instagram"
    WHATSAPP = GLOBAL.ARCHIVE_DIR + "/whatsapp"


class MACROS:
    SPOTIFY = "SPOTIFY"
    HDO = "HDO"
    YOUTUBE = "YOUTUBE_YOUTUBE"
    YOUTUBE_MUSIC = "YOUTUBE_MUSIC"
    YOUTUBE_MICROG = "YOUTUBE_MICROG"
    INSTAGRAM = "INSTAGRAM"
    WHATSAPP = "WHATSAPP"


class COLORS:
    RED: str = "\033[1;31m"
    GREEN: str = "\033[1;32m"
    YELLOW: str = "\033[1;33m"
    BLUE: str = "\033[1;34m"
    WHITE: str = "\033[1;37m"
    RESET: str = "\033[0;0m"


PATHS = {
    MACROS.SPOTIFY: DIRS.SPOTIFY + "/spotify.apk",
    MACROS.HDO: DIRS.HDO + "/hdo.apk",
    MACROS.YOUTUBE: DIRS.YOUTUBE + "/youtube.apk",
    MACROS.YOUTUBE_MUSIC: DIRS.YOUTUBE + "/youtube_music.apk",
    MACROS.YOUTUBE_MICROG: DIRS.YOUTUBE + "/micro_g.apk",
    MACROS.INSTAGRAM: DIRS.INSTAGRAM + "/instagram.apk",
    MACROS.WHATSAPP: DIRS.WHATSAPP + "/whatsapp.apk",
}

PACKAGES = {
    MACROS.HDO: "com.hdobox",
    MACROS.YOUTUBE: "app.revanced.android.youtube",
    MACROS.YOUTUBE_MUSIC: "app.revanced.android.apps.youtube.music",
    MACROS.YOUTUBE_MICROG: "com.mgoogle.android.gms",
    MACROS.SPOTIFY: "com.spotify.music",
    MACROS.INSTAGRAM: "com.instagram.android",
    MACROS.WHATSAPP: "com.whatsapp",
}


class Exceptions:
    class InvalidMacro(Exception):
        def __init__(self, macro: str):
            self.macro = macro

        def __str__(self):
            return f"{COLORS.RED}Error{COLORS.RESET} Macro {COLORS.WHITE}{self.macro}{COLORS.RESET} not found in PATHS"

    class InvalidUrl(Exception):
        def __init__(self, url: str):
            self.url = url

        def __str__(self):
            return f"{COLORS.RED}Error{COLORS.RESET} Invalid url {COLORS.WHITE}{self.url}{COLORS.RESET}"

    class InvalidPackage(Exception):
        def __init__(self, macro: str, package: str):
            self.macro = macro
            self.package = package

        def __str__(self):
            return f"{COLORS.RED}Error{COLORS.RESET} Macro {COLORS.WHITE}{self.macro}{COLORS.RESET} has package {COLORS.WHITE}{self.package}{COLORS.RESET} instead of {COLORS.WHITE}{PACKAGES[self.macro]}{COLORS.RESET}"


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


GITHUB_DATA = {
    MACROS.YOUTUBE_MICROG: {"user": "TeamVanced", "repo": "VancedMicroG"},
    MACROS.YOUTUBE: {"user": "j-hc", "repo": "revanced-magisk-module"},
    MACROS.YOUTUBE_MUSIC: {"user": "j-hc", "repo": "revanced-magisk-module"},
}


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


def updateHDO():
    link = "https://hdo.app/download"
    try:
        AppBase(MACROS.HDO, link)
    except Exception as e:
        print(e)
        return


def updateMicroG():
    scrapper = GithubScrapping(
        GITHUB_DATA[MACROS.YOUTUBE_MICROG]["user"],
        GITHUB_DATA[MACROS.YOUTUBE_MICROG]["repo"],
    )
    latest = scrapper.getVersions()[0]
    link = scrapper.link(latest, [".apk"])[0]
    try:
        AppBase(MACROS.YOUTUBE_MICROG, link)
    except Exception as e:
        print(e)
        return


def updateYoutube():
    scrapper = GithubScrapping(
        GITHUB_DATA[MACROS.YOUTUBE]["user"],
        GITHUB_DATA[MACROS.YOUTUBE]["repo"],
    )
    versions = scrapper.getVersions()
    index = 0
    link = None
    while link is None and index < len(versions):
        links = scrapper.link(
            versions[index], [".apk", "youtube"], ["extended", "arm-v7a"]
        )
        if len(links) > 0:
            link = links[0]
            break
        index += 1
    try:
        AppBase(MACROS.YOUTUBE, link)
    except Exception as e:
        print(e)
        return


def updateYoutubeMusic():
    scrapper = GithubScrapping(
        GITHUB_DATA[MACROS.YOUTUBE_MUSIC]["user"],
        GITHUB_DATA[MACROS.YOUTUBE_MUSIC]["repo"],
    )
    versions = scrapper.getVersions()
    index = 0
    link = None
    while link is None and index < len(versions):
        links = scrapper.link(
            versions[index], [".apk", "music"], ["extended", "arm-v7a"]
        )
        if len(links) > 0:
            link = links[0]
            break
        index += 1
    try:
        AppBase(MACROS.YOUTUBE_MUSIC, link)
    except Exception as e:
        print(e)
        return


def updateSpotifySelenium():
    scrapper = WebScrapper(selenium=True)
    scrapper.driver.get("https://spotifygeek.tricksnation.com/link/download/1/")
    elements = scrapper.driver.find_elements(By.XPATH, "//a[@href]")
    link = None
    for element in elements:
        if element.get_attribute("href") and element.get_attribute("href").endswith(
            ".apk"
        ):
            link = element.get_attribute("href")
            scrapper.quit_selenium()
            break
    try:
        AppBase(MACROS.SPOTIFY, link)
    except Exception as e:
        print(e)
        return


def push_changes():
    os.chdir(GLOBAL.ARCHIVE_DIR)
    os.system("git add .")
    now = datetime.datetime.now()
    time = now.strftime("%d/%m/%y - %H:%M:%S")
    os.system(f'git commit -m "[ {time} ]"')
    os.system("git push origin gh-pages")


import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def publish_changes():
    cred = credentials.Certificate(GLOBAL.ENV_PATH)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    with open(GLOBAL.INDEX_PATH, "r") as index_file:
        index = json.load(index_file)
        for macro in index.keys():
            doc_ref = db.collection("apps").document(macro)
            doc_ref.set(
                {
                    "version": index[macro]["version"],
                    "link": index[macro]["link"],
                }
            )


def updateInstagram():
    link = "https://thedise.me/instander/repo/"
    scrapper = WebScrapper(selenium=True)
    scrapper.driver.get(link)
    as_ = scrapper.get_selenium_tags(scrapper.driver, "a")
    for a in as_:
        if a.get_attribute("href") and a.get_attribute("href").endswith(".apk"):
            link = a.get_attribute("href")
            scrapper.quit_selenium()
            break
    try:
        AppBase(MACROS.INSTAGRAM, link)
    except Exception as e:
        print(e)
        return


def updateWhatsapp():
    link = "https://dl.gbapkpro.com/fouadwa/"
    try:
        AppBase(MACROS.WHATSAPP, link)
    except Exception as e:
        print(e)
        return


def main():
    updateHDO()
    updateMicroG()
    updateYoutube()
    updateYoutubeMusic()
    updateSpotifySelenium()
    updateInstagram()
    updateWhatsapp()
    publish_changes()
    push_changes()


if __name__ == "__main__":
    main()
