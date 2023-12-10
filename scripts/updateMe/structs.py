from dataclasses import dataclass


@dataclass
class APKInfo:
    version: str
    link: str

    @property
    def toDict(self):
        return {"version": self.version, "link": self.link}

    def __eq__(self, other):
        return self.version == other.version and self.link == other.link


@dataclass
class AppInfo:
    package: str
    apkInfo: APKInfo

    @property
    def toDict(self):
        return {
            "package": self.package,
            "version": self.apkInfo.version,
            "link": self.apkInfo.link,
        }
