from apps import *
from pyvirtualdisplay import Display
from index import IndexManager, IndexInfo
from typing import Dict
import os
import sys


def init() -> Dict[str, IndexInfo]:
    old_index = IndexManager.get_index()
    IndexManager.init_firebase()
    return old_index


updates_map = {
    MACROS.HDO: updateHDO,
    MACROS.YOUTUBE_MICROG: updateMicroG,
    MACROS.YOUTUBE: updateYoutube,
    MACROS.YOUTUBE_MUSIC: updateYoutubeMusic,
    MACROS.SPOTIFY: updateSpotify,
    MACROS.CAPCUT: updateCapcut,
    MACROS.PHOTO_EDITOR_PRO: updatePhotoEditorPro,
    MACROS.INSHOT: updateInshot,
    MACROS.PHOTOSHOP_EXPRESS: updatePhotoshopExpress,
    MACROS.INSTAGRAM: updateAeroInstagram,
    MACROS.TWITTER: updateAeroTwitter,
    MACROS.WHATSAPP: updateWhatsappAero,
}


def updateApp(macro: str, func: callable) -> None:
    displayActive = True
    while True:
        try:
            if displayActive:
                display = Display(visible=0, size=(1920, 1080))
                display.start()
            func()
            if displayActive:
                display.stop()
            break
        except Exception as e:
            print(e)
            if displayActive:
                display.stop()
            answer = input(f"Error while updating {macro}, do you want to retry? [Y/n]")
            if answer.lower() != "y":
                os.system(
                    f"code /home/anfreire/Documents/Projects/Personal/updateMe/scripts"
                )
                sys.exit(1)
            answer = input(f"Do you want to disable display? [Y/n]")
            if answer.lower() == "y":
                displayActive = False
            else:
                displayActive = True


def update_all():
    for macro, func in updates_map.items():
        updateApp(macro, func)


def update_single():
    print("Available apps:")
    for index, macro in enumerate(updates_map.keys()):
        print(f"{index}: {macro}")
    index = int(input("Select app: "))
    macro = list(updates_map.keys())[index]
    func = updates_map[macro]
    updateApp(macro, func)


def main():
    old_index = init()
    answer = input(f"Do you want to update all apps? [Y/n]")
    if answer.lower() != "y":
        update_single()
    else:
        update_all()
    IndexManager.push_git(old_index)
    IndexManager.push_firebase(old_index)
    IndexManager.send_notifications(old_index)
    IndexManager.get_reports()


if __name__ == "__main__":
    main()
