from apps import *
from pyvirtualdisplay import Display
from index import IndexManager


def main():
    display = Display(visible=0, size=(1920, 1080))
    display.start()
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
    IndexManager.push_git()
    IndexManager.push_firebase()


if __name__ == "__main__":
    main()
