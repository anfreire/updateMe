from apps import *
from publish import publish_changes, push_changes
from pyvirtualdisplay import Display


def main():
    answer = input("Do you want to run in headless mode? (Y/n) ").lower() != "n"
    if answer:
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
    if answer:
        display.stop()


if __name__ == "__main__":
    main()
