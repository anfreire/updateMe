from apps import *
from publish import publish_changes, push_changes


def main():
    updateHDO()
    updateMicroG()
    updateYoutube()
    updateYoutubeMusic()
    updateSpotify()
    updateInstagram()
    updateWhatsapp()
    updateCapcut()
    updatePhotoEditorPro()
    publish_changes()
    push_changes()


if __name__ == "__main__":
    main()
