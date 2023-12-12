import RNFetchBlob from 'rn-fetch-blob';
import React from 'react';
import {Linking} from 'react-native';

namespace Files {
  export async function listFiles(): Promise<string[]> {
    const files = await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.DownloadDir);
    return files;
  }

  export interface FileInfo {
    filename: string;
    lastModified: number;
    size: number;
  }

  export async function deleteFile(filename: string): Promise<void> {
    await RNFetchBlob.fs.unlink(
      `${RNFetchBlob.fs.dirs.DownloadDir}/${filename}`,
    );
  }

  export async function deleteMultiple(files: string[]): Promise<void> {
    Promise.all(files.map(async file => await Files.deleteFile(file)));
  }

  export async function getFileInfos(filename: string): Promise<FileInfo> {
    const infos = await RNFetchBlob.fs.stat(
      `${RNFetchBlob.fs.dirs.DownloadDir}/${filename}`,
    );
    return {
      filename: infos.filename,
      lastModified: infos.lastModified,
      size: infos.size,
    };
  }

  export async function download(
    url: string,
    filename: string,
    onProgress: React.Dispatch<React.SetStateAction<number>>,
  ): Promise<string> {
    const dest = `${RNFetchBlob.fs.dirs.DownloadDir}/${filename}`;
    try {
      const exists = await RNFetchBlob.fs.exists(dest);
      if (exists) await RNFetchBlob.fs.unlink(dest);
    } catch (e) {
      console.log('insideDownload', e);
    }
    await RNFetchBlob.config({
      path: dest,
    })
      .fetch('GET', url, {
        'Content-Type': 'application/octet-stream',
      })
      .progress((received, total) => onProgress(received / total));
    return dest;
  }
}

export default Files;
