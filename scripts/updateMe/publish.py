from constants import GLOBAL
import os
import datetime
import json

def push_changes():
    os.chdir(GLOBAL.ARCHIVE_DIR)
    os.system("git add .")
    now = datetime.datetime.now()
    time = now.strftime("%d/%m/%y - %H:%M:%S")
    os.system(f'git commit -m "[ {time} ]"')
    os.system("git push origin gh-pages")


import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def publish_changes():
    cred = credentials.Certificate(GLOBAL.ENV_PATH)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    with open(GLOBAL.INDEX_PATH, "r") as index_file:
        index = json.load(index_file)
        for macro in index.keys():
            doc_ref = db.collection("apps").document(macro)
            doc_ref.set(
                {
                    "version": index[macro]["version"],
                    "link": index[macro]["link"],
                }
            )