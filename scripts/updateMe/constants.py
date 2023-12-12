class GLOBAL:
    ARCHIVE_DIR = "/home/anfreire/Documents/Projects/Android/updateMe/scripts"
    INDEX_PATH = ARCHIVE_DIR + "/index.json"
    ENV_PATH = ARCHIVE_DIR + "/env.json"


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
    WHATSAPP = "WHATSAPP"
    CAPCUT = "CAPCUT"
    PHOTO_EDITOR_PRO = "PHOTO_EDITOR_PRO"
    INSHOT = "INSHOT"


PATHS = {
    MACROS.SPOTIFY: GLOBAL.ARCHIVE_DIR + "/spotify.apk",
    MACROS.HDO: GLOBAL.ARCHIVE_DIR + "/hdo.apk",
    MACROS.YOUTUBE: GLOBAL.ARCHIVE_DIR + "/youtube.apk",
    MACROS.YOUTUBE_MUSIC: GLOBAL.ARCHIVE_DIR + "/youtube_music.apk",
    MACROS.YOUTUBE_MICROG: GLOBAL.ARCHIVE_DIR + "/micro_g.apk",
    MACROS.INSTAGRAM: GLOBAL.ARCHIVE_DIR + "/instagram.apk",
    MACROS.WHATSAPP: GLOBAL.ARCHIVE_DIR + "/whatsapp.apk",
    MACROS.CAPCUT: GLOBAL.ARCHIVE_DIR + "/capcut.apk",
    MACROS.PHOTO_EDITOR_PRO: GLOBAL.ARCHIVE_DIR + "/photo_editor_pro.apk",
    MACROS.INSHOT: GLOBAL.ARCHIVE_DIR + "/inshot.apk",
}

PACKAGES = {
    MACROS.HDO: "com.hdobox",
    MACROS.YOUTUBE: "app.revanced.android.youtube",
    MACROS.YOUTUBE_MUSIC: "app.revanced.android.apps.youtube.music",
    MACROS.YOUTUBE_MICROG: "com.mgoogle.android.gms",
    MACROS.SPOTIFY: "com.spotify.music",
    MACROS.INSTAGRAM: "com.instagram.android",
    MACROS.WHATSAPP: "com.whatsapp",
    MACROS.CAPCUT: "com.lemon.lvoverseas",
    MACROS.PHOTO_EDITOR_PRO: "photo.editor.photoeditor.photoeditorpro",
    MACROS.INSHOT: "com.camerasideas.instashot",
}

GITHUB_DATA = {
    MACROS.YOUTUBE_MICROG: {"user": "TeamVanced", "repo": "VancedMicroG"},
    MACROS.YOUTUBE: {"user": "j-hc", "repo": "revanced-magisk-module"},
    MACROS.YOUTUBE_MUSIC: {"user": "j-hc", "repo": "revanced-magisk-module"},
}


class Exceptions:
    class InvalidMacro(Exception):
        def __init__(self, macro: str):
            self.macro = macro

        def __str__(self):
            return f"{COLORS.RED}Error{COLORS.RESET} Macro {COLORS.WHITE}{self.macro}{COLORS.RESET} not found in PATHS"

    class InvalidUrl(Exception):
        def __init__(self, url: str):
            self.url = url

        def __str__(self):
            return f"{COLORS.RED}Error{COLORS.RESET} Invalid url {COLORS.WHITE}{self.url}{COLORS.RESET}"

    class InvalidPackage(Exception):
        def __init__(self, macro: str, package: str):
            self.macro = macro
            self.package = package

        def __str__(self):
            return f"{COLORS.RED}Error{COLORS.RESET} Macro {COLORS.WHITE}{self.macro}{COLORS.RESET} has package {COLORS.WHITE}{self.package}{COLORS.RESET} instead of {COLORS.WHITE}{PACKAGES[self.macro]}{COLORS.RESET}"
