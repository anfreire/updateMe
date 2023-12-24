from apps import *
from pyvirtualdisplay import Display
from index import IndexManager, IndexInfo
from typing import Dict

def init() -> tuple[Dict[str, IndexInfo], Display]:
    old_index = IndexManager.get_index()
    IndexManager.init_firebase()
    display = Display(visible=0, size=(1920, 1080))
    display.start()
    return old_index, display


def main():
    old_index, display = init()
    updateHDO()
    updateMicroG()
    updateYoutube()
    updateYoutubeMusic()
    updateSpotify()
    updateCapcut()
    updatePhotoEditorPro()
    updateInshot()
    updatePhotoshopExpress()
    updateAeroInstagram()
    updateAeroTwitter()
    updateWhatsappAero()
    display.stop()
    IndexManager.push_git(old_index)
    IndexManager.push_firebase(old_index)
    IndexManager.send_notifications(old_index)
    IndexManager.get_reports()


if __name__ == "__main__":
    main()
