import os
import json
import datetime
import firebase_admin
from typing import Dict
from structs import IndexInfo, Reports
from constants import GLOBAL, COLORS
from firebase_admin import firestore
from firebase_admin import credentials
from firebase_admin import messaging
from firebase_admin import db
import configparser


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
    def did_update(cls, old_index: Dict[str, IndexInfo]) -> bool:
        index = IndexManager.get_index()
        updated = False
        for macro in index.keys():
            if (
                index[macro].version != old_index[macro].version
                or index[macro].link != old_index[macro].link
            ):
                updated = True
                break
        return updated

    @classmethod
    def push_git(cls, old_index: Dict[str, IndexInfo]) -> None:
        updated = IndexManager.did_update(old_index)
        if not updated:
            print(
                f"[  {COLORS.GREEN}OK  {COLORS.RESET}] No need to push to GitHub, no updates"
            )
            answer = input(f"Do you want to push anyway? [Y/n]")
            if answer.lower() != "y":
                return
        os.chdir(GLOBAL.ARCHIVE_DIR)
        os.system("git add index.json")
        now = datetime.datetime.now()
        time = now.strftime("%d/%m/%y - %H:%M:%S")
        os.system(f'git commit -m "[ {time} ]"')
        os.system("git push origin gh-pages")
        print(f"[  {COLORS.GREEN}OK  {COLORS.RESET}] Pushed to GitHub")

    @classmethod
    def init_firebase(cls) -> None:
        cred = credentials.Certificate(GLOBAL.ENV_PATH)
        firebase_admin.initialize_app(cred)

    @classmethod
    def push_firebase(cls, old_index: Dict[str, IndexInfo] | None = None) -> None:
        db = firestore.client()
        index = IndexManager.get_index()
        updated = IndexManager.did_update(old_index)
        if not updated:
            print(
                f"[  {COLORS.GREEN}OK  {COLORS.RESET}] No need to push to Firebase, no updates"
            )
            answer = input(f"Do you want to push anyway? [Y/n]")
            if answer.lower() != "y":
                return
        for macro in index.keys():
            doc_ref = db.collection("apps").document(macro)
            doc_ref.set(index[macro].toDict)
        print(f"[  {COLORS.GREEN}OK  {COLORS.RESET}] Pushed to Firebase")

    @classmethod
    def send_notifications(cls, old_index: Dict[str, IndexInfo] | None = None) -> None:
        index = IndexManager.get_index()
        updates = []
        data = None
        for macro in index.keys():
            if index[macro].version != old_index[macro].version:
                updates.append(macro)
        if len(updates) > 0:
            data = {index[macro].packageName: index[macro].version for macro in updates}
            print(
                f"[  {COLORS.GREEN}OK  {COLORS.RESET}] Sent notifications of {len(updates)} updates"
            )
        else:
            print(
                f"[  {COLORS.GREEN}OK  {COLORS.RESET}] No need to send notifications, no updates"
            )
            return
        ref = db.reference(url=GLOBAL.DATABASE_REFERRENCE)
        tokens = ref.get()["devices"].keys()
        for token in tokens:
            try:
                message = messaging.Message(
                    data=data,
                    token=token,
                    android=messaging.AndroidConfig(
                        priority="high", notification=messaging.AndroidNotification()
                    ),
                )
                messaging.send(message)
                print(
                    f"[  {COLORS.GREEN}OK  {COLORS.RESET}] Sent notification to {token[0:5]}...{token[-5:]}"
                )
            except Exception:
                print(
                    f"[ {COLORS.RED}FAIL {COLORS.RESET}] Failed to send notification to {token[0:5]}...{token[-5:]}"
                )

    def get_reports() -> None:
        reports_path = GLOBAL.ARCHIVE_DIR + "/reports.ini"
        config = configparser.ConfigParser()
        ref = db.reference(url=GLOBAL.DATABASE_REFERRENCE)
        try:
            tokens = ref.get()["reports"]
            new_reports = []
            for token in tokens:
                if token not in config.sections():
                    new_report = Reports(
                        key=token,
                        author_name=tokens[token]["name"],
                        item_reported=tokens[token]["item"],
                        description=tokens[token]["description"],
                    )
                    new_reports.append(new_report)
                    ref.child("reports").child(token).delete()
            for report in new_reports:
                config[report.key] = report.toDict
            with open(reports_path, "w") as configfile:
                config.write(configfile)
            print(
                f"[  {COLORS.GREEN}OK  {COLORS.RESET}] Got {len(new_reports)} new reports"
            )
        except Exception:
            print(f"[  {COLORS.GREEN}OK{COLORS.RESET}  ] No new reports")
            return
