class GLOBAL:
    ARCHIVE_DIR = "/home/anfreire/Documents/Projects/Personal/updateMe/scripts"
    INDEX_PATH = ARCHIVE_DIR + "/index.json"
    ENV_PATH = ARCHIVE_DIR + "/env.json"
    CURR_APP = ARCHIVE_DIR + "/app.apk"
    DATABASE_REFERRENCE = (
        "https://updateme-8f42b-default-rtdb.europe-west1.firebasedatabase.app/"
    )


class COLORS:
    RED: str = "\033[1;31m"
    GREEN: str = "\033[1;32m"
    YELLOW: str = "\033[1;33m"
    BLUE: str = "\033[1;34m"
    WHITE: str = "\033[1;37m"
    RESET: str = "\033[0;0m"


class MACROS:
    SPOTIFY = "SPOTIFY"
    HDO = "HDO"
    YOUTUBE = "YOUTUBE_YOUTUBE"
    YOUTUBE_MUSIC = "YOUTUBE_MUSIC"
    YOUTUBE_MICROG = "YOUTUBE_MICROG"
    INSTAGRAM = "INSTAGRAM"
    TWITTER = "TWITTER"
    WHATSAPP = "WHATSAPP"
    CAPCUT = "CAPCUT"
    PHOTO_EDITOR_PRO = "PHOTO_EDITOR_PRO"
    INSHOT = "INSHOT"
    PHOTOSHOP_EXPRESS = "PHOTOSHOP_EXPRESS"

    @classmethod
    def get_col(cls) -> list:
        return [
            cls.SPOTIFY,
            cls.HDO,
            cls.YOUTUBE,
            cls.YOUTUBE_MUSIC,
            cls.YOUTUBE_MICROG,
            cls.INSTAGRAM,
            cls.TWITTER,
            cls.WHATSAPP,
            cls.CAPCUT,
            cls.PHOTO_EDITOR_PRO,
            cls.INSHOT,
            cls.PHOTOSHOP_EXPRESS,
        ]


GITHUB_DATA = {
    MACROS.YOUTUBE_MICROG: {"user": "TeamVanced", "repo": "VancedMicroG"},
    MACROS.YOUTUBE: {"user": "j-hc", "repo": "revanced-magisk-module"},
    MACROS.YOUTUBE_MUSIC: {"user": "j-hc", "repo": "revanced-magisk-module"},
}
