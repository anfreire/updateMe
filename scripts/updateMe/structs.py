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

@dataclass
class Reports:
    key: str
    author_name: str
    item_reported: str
    description: str
    
    @property
    def toDict(self):
        return {
            "author_name": self.author_name,
            "item_reported": self.item_reported,
            "description": self.description,
        }