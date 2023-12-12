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
    updateInstagram()
    updateWhatsapp()
    updateCapcut()
    updatePhotoEditorPro()
    updateInshot()
    updatePhotoshopExpress()
    publish_changes()
    push_changes()
    display.stop()


if __name__ == "__main__":
    main()
