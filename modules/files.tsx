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

  export async function download(
    url: string,
    filename: string,
    onProgress: (progress: number) => void,
  ) {
    const dir = await getDir();
    return await RNFetchBlob.config({
      path: `${dir}/${filename}`,
      fileCache: false,
    })
      .fetch('GET', url, {
        'Cache-Control': 'no-store',
      })
      .progress((received, total) => {
        onProgress(received / total);
      });
  }

  export async function install(path: string) {
    const granted = await Permissions.getPermissions('INSTALL');
    if (!granted) await Permissions.requestPermissions('INSTALL');
    RNFetchBlob.android.actionViewIntent(
      path,
      'application/vnd.android.package-archive',
    );
  }
}

export default Files;
