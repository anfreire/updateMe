from dataclasses import dataclass, field


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
class IndexInfo:
    title: str
    packageName: str
    url: str
    version: str
    link: str

    @property
    def toDict(self):
        return {
            "title": self.title,
            "packageName": self.packageName,
            "url": self.url,
            "version": self.version,
            "link": self.link,
        }
