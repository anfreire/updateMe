import RNFetchBlob from 'rn-fetch-blob';
import Permissions from '../modules/permissions';
import Files from '../modules/files';
import Apps from '../modules/apps';
import {SourceType} from '../hooks/source';
import {WarningType} from '../base/warning';

export async function getIndex(): Promise<null | SourceType> {
  try {
    const response = await fetch(
      'https://github.com/anfreire/Archive/raw/gh-pages/updateMe/index.json',
    );
    return await response.json();
  } catch (_) {
    return null;
  }
}

export async function downloadAndInstall(
  url?: string,
  onProgress?: (progress: number) => void,
): Promise<void> {
  if (!url) return;
  onProgress ||= () => {};
  const filename = url.split('/')[url.split('/').length - 1];
  const granted_write = await Permissions.getPermissions('WRITE');
  if (!granted_write) await Permissions.requestPermissions('WRITE');
  const granted_read = await Permissions.getPermissions('READ');
  if (!granted_read) await Permissions.requestPermissions('READ');
  const path = await Files.download(url, filename, onProgress);
  const granted = await Permissions.getPermissions('INSTALL');
  if (!granted) await Permissions.requestPermissions('INSTALL');
  await Apps.installAPK(path);
}

export type AppState = 'UP TO DATE' | 'UPDATE AVAILABLE' | 'NOT INSTALLED';

export async function getSingleAppSate(
  packageName: string,
  currVersion: string,
) {
  const version = await Apps.getAppVersion(packageName);
  if (!version) return 'NOT INSTALLED';
  if (version !== currVersion) return 'UPDATE AVAILABLE';
  return 'UP TO DATE';
}

export async function getAppState(
  packageName: string,
  currVersion: string,
  microGCurrVersion?: string,
): Promise<AppState> {
  if (
    (packageName === 'app.revanced.android.youtube' ||
      packageName === 'app.revanced.android.apps.youtube.music') &&
    microGCurrVersion
  ) {
    const youtubeState = await getSingleAppSate(packageName, currVersion);
    const microGState = await getSingleAppSate(
      'com.mgoogle.android.gms',
      microGCurrVersion,
    );
    if (youtubeState === 'UP TO DATE' && microGState === 'UP TO DATE')
      return 'UP TO DATE';
    else if (
      youtubeState === 'NOT INSTALLED' ||
      microGState === 'NOT INSTALLED'
    )
      return 'NOT INSTALLED';
    else return 'UPDATE AVAILABLE';
  }
  return await getSingleAppSate(packageName, currVersion);
}

export const tiles = {
  'app.revanced.android.youtube': 'YouTube Vanced',
  'app.revanced.android.apps.youtube.music': 'YouTube Music Vanced',
  'com.mgoogle.android.gms': 'MicroG',
  'com.spotify.music': 'Spotify',
  'com.hdobox': 'HDO',
};

export const packageToKeys = {
  'app.revanced.android.youtube': 'YOUTUBE_YOUTUBE',
  'app.revanced.android.apps.youtube.music': 'YOUTUBE_MUSIC',
  'com.mgoogle.android.gms': 'YOUTUBE_MICROG',
  'com.spotify.music': 'SPOTIFY',
  'com.hdobox': 'HDO',
};

const StateUP_TO_DATE = (
  packageName: string,
): {type: 'OK'; message: string} => {
  if (
    packageName === 'app.revanced.android.youtube' ||
    packageName === 'app.revanced.android.apps.youtube.music'
  ) {
    return {
      type: 'OK',
      message: `${tiles[packageName]} and MicroG are up to date.`,
    };
  }
  return {
    type: 'OK',
    message: `${(tiles as any)[packageName]} is up to date.`,
  };
};

const StateUPDATE_AVAILABLE = async (
  packageName: string,
  currVersion: string,
  microGCurrVersion?: string,
): Promise<{type: 'WARNING'; message: string}> => {
  if (
    packageName === 'app.revanced.android.youtube' ||
    packageName === 'app.revanced.android.apps.youtube.music'
  ) {
    const youtubeVersion = await Apps.getAppVersion(packageName);
    const microGVersion = await Apps.getAppVersion('com.mgoogle.android.gms');
    if (youtubeVersion !== currVersion && microGVersion !== microGCurrVersion) {
      return {
        type: 'WARNING',
        message: `${tiles[packageName]} and MicroG are not up to date.`,
      };
    } else if (youtubeVersion === currVersion) {
      return {
        type: 'WARNING',
        message: `${tiles[packageName]} is up to date, but MicroG is not.`,
      };
    } else if (microGVersion === microGCurrVersion) {
      return {
        type: 'WARNING',
        message: `MicroG is up to date, but ${tiles[packageName]} is not.`,
      };
    }
  }
  return {
    type: 'WARNING',
    message: `${(tiles as any)[packageName]} is not up to date.`,
  };
};

const StateNOT_INSTALLED = async (
  packageName: string,
): Promise<{type: 'ERROR'; message: string}> => {
  if (
    packageName === 'app.revanced.android.youtube' ||
    packageName === 'app.revanced.android.apps.youtube.music'
  ) {
    const youtubeVersion = await Apps.getAppVersion(packageName);
    const microGVersion = await Apps.getAppVersion('com.mgoogle.android.gms');
    if (youtubeVersion == null && microGVersion == null) {
      return {
        type: 'ERROR',
        message: `${tiles[packageName]} and MicroG are not installed.`,
      };
    } else if (youtubeVersion) {
      return {
        type: 'ERROR',
        message: `${tiles[packageName]} is installed, but MicroG is not.`,
      };
    } else if (microGVersion) {
      return {
        type: 'ERROR',
        message: `MicroG is installed, but ${tiles[packageName]} is not.`,
      };
    }
  }
  return {
    type: 'ERROR',
    message: `${(tiles as any)[packageName]} is not installed.`,
  };
};

export async function getWarning(
  packageName: string,
  currVersion: string,
  microGCurrVersion?: string,
): Promise<{type: WarningType; message: string}> {
  const state = await getAppState(packageName, currVersion, microGCurrVersion);
  switch (state) {
    case 'UP TO DATE':
      return StateUP_TO_DATE(packageName);
    case 'UPDATE AVAILABLE':
      return await StateUPDATE_AVAILABLE(
        packageName,
        currVersion,
        microGCurrVersion,
      );
    case 'NOT INSTALLED':
      return await StateNOT_INSTALLED(packageName);
  }
}
