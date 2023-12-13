import ReactNativeBlobUtil from 'react-native-blob-util';

namespace FilesModule {
  export const dir: string = ReactNativeBlobUtil.fs.dirs.DocumentDir;
  export interface FileInfo {
    filename: string;
    lastModified: number;
    size: number;
  }

  export async function getFileInfos(filename: string): Promise<FileInfo> {
    const infos = await ReactNativeBlobUtil.fs.stat(`${dir}/${filename}`);
    return {
      filename: infos.filename,
      lastModified: infos.lastModified,
      size: infos.size,
    };
  }

  export async function listDir(): Promise<string[]> {
    return await ReactNativeBlobUtil.fs.ls(dir);
  }

  export async function downloadApk(
    url: string,
    filename: string,
    onProgress: (progress: number) => void,
  ): Promise<string> {
    const path = `${dir}/${filename}`;
    const res = await ReactNativeBlobUtil.config({fileCache: true, path})
      .fetch('GET', url, {})
      .progress((received, total) => {
        onProgress(parseFloat(received) / parseFloat(total));
      });
    return res.path();
  }

  export async function installApk(path: string): Promise<void> {
    if (!path.startsWith(dir)) path = `${dir}/${path}`;
    await ReactNativeBlobUtil.android.actionViewIntent(
      path,
      'application/vnd.android.package-archive',
    );
  }

  export async function deleteFile(fileName: string): Promise<void> {
    await ReactNativeBlobUtil.fs.unlink(`${dir}/${fileName}`);
  }

  export async function deleteMultipleFiles(
    fileNames: string[],
  ): Promise<void> {
    await Promise.all(
      fileNames.map(async fileName => await deleteFile(fileName)),
    );
  }
}

export default FilesModule;
