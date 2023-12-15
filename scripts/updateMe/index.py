import os
import json
import datetime
import firebase_admin
from typing import Dict
from structs import IndexInfo
from constants import GLOBAL, COLORS
from firebase_admin import firestore
from firebase_admin import credentials


class IndexManager:
    @classmethod
    def get_index(cls, macro: str | None = None) -> IndexInfo | Dict[str, IndexInfo]:
        with open(GLOBAL.INDEX_PATH, "r") as index_file:
            index = json.load(index_file)
            return (
                IndexInfo(
                    title=index[macro]["title"],
                    packageName=index[macro]["packageName"],
                    url=index[macro]["url"],
                    version=index[macro]["version"],
                    link=index[macro]["link"],
                )
                if macro
                else {
                    macro: IndexInfo(
                        title=index[macro]["title"],
                        packageName=index[macro]["packageName"],
                        url=index[macro]["url"],
                        version=index[macro]["version"],
                        link=index[macro]["link"],
                    )
                    for macro in index.keys()
                }
            )

    @classmethod
    def update_index(cls, macro: str, index: IndexInfo) -> None:
        with open(GLOBAL.INDEX_PATH, "r") as index_file:
            index_dict = json.load(index_file)
            index_dict[macro] = index.toDict
        with open(GLOBAL.INDEX_PATH, "w") as index_file:
            json.dump(index_dict, index_file, indent=4)

    @classmethod
    def push_git(cls) -> None:
        os.chdir(GLOBAL.ARCHIVE_DIR)
        os.system("git add index.json")
        now = datetime.datetime.now()
        time = now.strftime("%d/%m/%y - %H:%M:%S")
        os.system(f'git commit -m "[ {time} ]"')
        os.system("git push origin gh-pages")
        print(f"[  {COLORS.GREEN}OK  {COLORS.RESET}] Pushed to GitHub")

    @classmethod
    def push_firebase(cls) -> None:
        cred = credentials.Certificate(GLOBAL.ENV_PATH)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        index = IndexManager.get_index()
        for macro in index.keys():
            doc_ref = db.collection("apps").document(macro)
            doc_ref.set(index[macro].toDict)
        print(f"[  {COLORS.GREEN}OK  {COLORS.RESET}] Pushed to Firebase")
