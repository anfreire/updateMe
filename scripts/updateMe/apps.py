from selenium.webdriver.common.by import By
from base import AppBase, GithubScrapping, WebScrapper, AeroScrapping
from constants import MACROS, GITHUB_DATA, COLORS
import time
import re


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


def updateAeroInstagram():
    link = "https://aeroinsta.com/download-insta-aero/package-2/?lang=en"
    try:
        scrapping = AeroScrapping()
        scrapping.open_link(link)
        link = scrapping.findLinkByText("Download via AeroMods.app (suggested)")
        scrapping.open_link(link)
        time.sleep(6)
        scrapping.click_span("checkbox-custom")
        link = scrapping.findLinkByText("Redirect Me!")
        scrapping.open_link(link)
        link = scrapping.find_link_that_ends_width(".apk")
        AppBase(MACROS.INSTAGRAM, link)
    except Exception as e:
        print(e)
        return

def updateAeroTwitter():
    link = "https://aerowitter.com/download-aero-twitter/package-2/?lang=en"
    try:
        scrapping = AeroScrapping()
        scrapping.open_link(link)
        link = scrapping.findLinkByText("Download Button 1 - AeroMods.app (Recommended)")
        scrapping.open_link(link)
        time.sleep(6)
        scrapping.click_span("checkbox-custom")
        link = scrapping.findLinkByText("Redirect Me!")
        scrapping.open_link(link)
        link = scrapping.find_link_that_ends_width(".apk")
        AppBase(MACROS.TWITTER, link)
    except Exception as e:
        print(e)
        return

def updateWhatsappAero():
    link = "https://whatsaero.com/download-wpaero/com_aero_modern/?lang=en"
    try:
        scrapping = AeroScrapping()
        scrapping.open_link(link)
        link = None
        h3s = scrapping.driver.driver.find_elements(By.XPATH, "//h3")
        for h3 in h3s:
            if h3.text == "Download Service 1":
                parent = h3.find_element(By.XPATH, "..")
                childs = parent.find_elements(By.XPATH, ".//*")
                _as = []
                for child in childs:
                    if child.tag_name == "a":
                        _as.append(child)
                pattern = r"V([\d\.]+)"
                versions = dict()
                for a in _as:
                    match = re.search(pattern, a.text)
                    if match:
                        versions[a] = match.group(1)
                    else:
                        versions[a] = None
                highest = None
                for a in versions:
                    if versions[a] is None:
                        continue
                    if highest is None:
                        highest = a
                    elif versions[a] > versions[highest]:
                        highest = a
                link = highest.get_attribute("href")
        if link is None:
            raise Exception(
                f"{COLORS.RED}Error{COLORS.RESET} Link not found: {COLORS.WHITE}WhatsApp Aero{COLORS.RESET}"
            )
        scrapping.open_link(link)
        try:
            link = scrapping.searchLinkByText("Redirect Me")
            scrapping.open_link(link)
        except:
            pass
        time.sleep(6)
        scrapping.click_span("checkbox-custom")
        link = scrapping.findLinkByText("Redirect Me!")
        scrapping.open_link(link)
        link = scrapping.find_link_that_ends_width(".apk")
        AppBase(MACROS.WHATSAPP, link)
    except Exception as e:
        print(e)
        return