from selenium.webdriver.common.by import By
from base import AppBase, GithubScrapping, WebScrapper
from constants import MACROS, GITHUB_DATA
import time


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


def updateSpotify():
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


def updateCapcut():
    link = "https://capcutapk.io/dl"
    try:
        AppBase(MACROS.CAPCUT, link)
    except Exception as e:
        print(e)
        return


def updatePhotoEditorPro():
    link = "https://modyolo.com/download/polish-photo-editor-pro-2578/1"
    scrapper = WebScrapper(selenium=True)
    scrapper.driver.get(link)
    link = None
    time.sleep(5)
    as_ = scrapper.get_selenium_tags(scrapper.driver, "a")
    for a in as_:
        if a.get_attribute("href") and a.get_attribute("href").endswith(".apk"):
            link = a.get_attribute("href")
            scrapper.quit_selenium()
            break
    try:
        AppBase(MACROS.PHOTO_EDITOR_PRO, link)
    except Exception as e:
        print(e)
        return


def updateInshot():
    link = "https://inshotpro.app/dl"
    try:
        AppBase(MACROS.INSHOT, link)
    except Exception as e:
        print(e)
        return

def updatePhotoshopExpress():
    link = "https://modyolo.com/download/photoshop-express-12281/1"
    scrapper = WebScrapper(selenium=True)
    scrapper.driver.get(link)
    link = None
    time.sleep(5)
    as_ = scrapper.get_selenium_tags(scrapper.driver, "a")
    for a in as_:
        if a.get_attribute("href") and a.get_attribute("href").endswith(".apk"):
            link = a.get_attribute("href")
            scrapper.quit_selenium()
            break
    try:
        AppBase(MACROS.PHOTOSHOP_EXPRESS, link)
    except Exception as e:
        print(e)
        print(type(e))
        print(e.__str__())
        return