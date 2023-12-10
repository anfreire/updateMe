import RNFetchBlob from 'rn-fetch-blob';

namespace Files {
  export const dir = RNFetchBlob.fs.dirs.DownloadDir;

  export async function listFiles(): Promise<string[]> {
    const files = await RNFetchBlob.fs.ls(dir);
    return files;
  }

  export interface FileInfo {
    filename: string;
    lastModified: number;
    size: number;
  }

  export async function deleteFile(filename: string): Promise<void> {
    await RNFetchBlob.fs.unlink(`${dir}/${filename}`);
  }

  export async function deleteMultiple(files: string[]): Promise<void> {
    Promise.all(files.map(async file => await Files.deleteFile(file)));
  }

  export async function getFileInfos(filename: string): Promise<FileInfo> {
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
