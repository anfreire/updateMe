import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Permissions from './permission';

namespace Files {
  export async function getDir() {
    const exists = await RNFetchBlob.fs.isDir(
      `${RNFetchBlob.fs.dirs.DownloadDir}/updateMe`,
    );
    if (!exists) {
      await RNFetchBlob.fs.mkdir(`${RNFetchBlob.fs.dirs.DownloadDir}/updateMe`);
    }
    return `${RNFetchBlob.fs.dirs.DownloadDir}/updateMe`;
  }

  export interface DownloadAndInstallOptions {
    url: string;
    fileName: string;
    onStart?: () => void;
    onProgress?: (progress: number) => void;
    onError?: (error: any) => void;
    onCompleted?: (path: string) => void;
  }

  export function downloadAndInstall({
    url,
    fileName,
    onStart = () => {},
    onProgress = () => {},
    onCompleted = () => {},
    onError = () => {},
  }: DownloadAndInstallOptions): void {
    getDir().then(dir => {
      onStart();
      RNFetchBlob.config({
        path: `${dir}/${fileName}`,
        fileCache: false,
      })
        .fetch('GET', url, {
          'Cache-Control': 'no-store',
        })
        .progress({interval: 250}, (received, total) => {
          onProgress(received / total);
        })
        .then(res => {
          RNFetchBlob.fs
            .exists(res.path())
            .then(exist => {
              exist
                ? (() => {
                    Permissions.getPermissions('INSTALL').then(granted => {
                      if (!granted) Permissions.requestPermissions('INSTALL');
                      RNFetchBlob.android.actionViewIntent(
                        res.path(),
                        'application/vnd.android.package-archive',
                      );
                      onCompleted(res.path());
                    });
                  })()
                : onError('File not found');
            })
            .catch(err => {
              onError(err);
              return;
            });
        })
        .catch(err => {
          onError(err);
        });
    });
  }
}

export default Files;
