from apps import *
from publish import publish_changes, push_changes
from pyvirtualdisplay import Display


def main():
    display = Display(visible=0, size=(800, 600))
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
    display.stop()
    updateAeroInstagram()
    updateAeroTwitter()
    updateWhatsappAero()
    publish_changes()
    push_changes()


if __name__ == "__main__":
    main()
