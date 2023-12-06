import RNFetchBlob from 'rn-fetch-blob';

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

  export async function listFiles(): Promise<string[]> {
    const dir = await getDir();
    const files = await RNFetchBlob.fs.ls(dir);
    return files;
  }

  export interface FileInfo {
    filename: string;
    lastModified: number;
    size: number;
  }

  export async function deleteFile(filename: string): Promise<void> {
    const dir = await getDir();
    await RNFetchBlob.fs.unlink(`${dir}/${filename}`);
  }

  export async function getFileInfos(filename: string): Promise<FileInfo> {
    const dir = await getDir();
    const infos = await RNFetchBlob.fs.stat(`${dir}/${filename}`);
    return {
      filename: infos.filename,
      lastModified: infos.lastModified,
      size: infos.size,
    };
  }

  export async function download(
    url: string,
    filename: string,
    onProgress: (progress: number) => void,
  ): Promise<string> {
    const dir = await getDir();
    const path = await RNFetchBlob.config({
      path: `${dir}/${filename}`,
      fileCache: false,
    })
      .fetch('GET', url, {
        'Cache-Control': 'no-store',
      })
      .progress((received, total) => {
        onProgress(received / total);
      })
      .then(res => res.path());
    return path;
  }
}

export default Files;
