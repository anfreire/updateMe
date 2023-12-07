import Permissions from '../modules/permissions';
import Files from '../modules/files';
import Apps from '../modules/apps';
import {SourceType} from '../hooks/useSource';
import {StateColors} from '../common/types';

export async function deleteAllFiles() {
  const files = await Files.listFiles();
  Promise.all(files.map(async file => await Files.deleteFile(file)));
}

export async function downloadAndInstall(
  source: SourceType,
  onProgress?: (progress: number) => void,
): Promise<boolean> {
  if (!source.link) return false;
  onProgress ||= () => {};
  const granted_write = await Permissions.getPermissions('WRITE');
  if (!granted_write) await Permissions.requestPermissions('WRITE');
  const granted_read = await Permissions.getPermissions('READ');
  if (!granted_read) await Permissions.requestPermissions('READ');
  const filename = source.link.split('/')[source.link.split('/').length - 1];
  const path = await Files.download(source.link, filename, onProgress);
  const granted = await Permissions.getPermissions('INSTALL');
  if (!granted) await Permissions.requestPermissions('INSTALL');
  await Apps.installAPK(path);
  return true;
}

export type AppState = 'UP TO DATE' | 'UPDATE AVAILABLE' | 'NOT INSTALLED';

export async function getSingleAppSate(
  source: SourceType,
): Promise<AppState | null> {
  if (!source.version) return null;
  const version = await Apps.getAppVersion(source.packageName);
  if (!version) return 'NOT INSTALLED';
  if (version !== source.version) return 'UPDATE AVAILABLE';
  return 'UP TO DATE';
}

export async function getAppState(
  source: SourceType,
  microGSource?: SourceType,
): Promise<AppState | null> {
  if (!source.version) return null;
  const sourceState = await getSingleAppSate(source);
  if (
    source.packageName === 'app.revanced.android.youtube' ||
    source.packageName === 'app.revanced.android.apps.youtube.music'
  ) {
    if (!microGSource) return null;
    const microGState = await getSingleAppSate(microGSource);
    if (sourceState === 'UP TO DATE' && microGState === 'UP TO DATE')
      return 'UP TO DATE';
    else if (sourceState === 'NOT INSTALLED' || microGState === 'NOT INSTALLED')
      return 'NOT INSTALLED';
    return 'UPDATE AVAILABLE';
  }
  return sourceState;
}

export interface WarningType {
  type: StateColors;
  message: string;
}

const ErrorState: WarningType = {
  type: 'RED',
  message: 'Error loading updated version.',
};

const State_UP_TO_DATE = (
  source: SourceType,
): WarningType => {
  if (
    source.packageName === 'app.revanced.android.youtube' ||
    source.packageName === 'app.revanced.android.apps.youtube.music'
  ) {
    return {
      type: 'GREEN',
      message: `${source.title} and MicroG are up to date.`,
    };
  }
  return {
    type: 'GREEN',
    message: `${source.title} is up to date.`,
  };
};

const State_UPDATE_AVAILABLE = async (
  source: SourceType,
  microGSource?: SourceType,
): Promise<WarningType> => {
  if (!source.version) return ErrorState;
  const sourceVersion = await Apps.getAppVersion(source.packageName);
  if (
    source.packageName === 'app.revanced.android.youtube' ||
    source.packageName === 'app.revanced.android.apps.youtube.music'
  ) {
    if (!microGSource || !microGSource.version) return ErrorState;
    const microGVersion = await Apps.getAppVersion(microGSource.packageName);
    switch (sourceVersion) {
      case source.version:
        switch (microGVersion) {
          case microGSource.version:
            return {
              type: 'YELLOW',
              message: `${source.title} and MicroG are not up to date.`,
            };
          default:
            return {
              type: 'YELLOW',
              message: `MicroG is up to date, but ${source.title} is not.`,
            };
        }
      default:
        switch (microGVersion) {
          case microGSource.version:
            return {
              type: 'YELLOW',
              message: `${source.title} is up to date, but MicroG is not.`,
            };
          default:
            return {
              type: 'YELLOW',
              message: `${source.title} and MicroG are not up to date.`,
            };
        }
    }
  }
  return {
    type: 'YELLOW',
    message: `${source.title} is not up to date.`,
  };
};

const State_NOT_INSTALLED = async (
  source: SourceType,
  microGSource?: SourceType,
): Promise<WarningType> => {
  if (!source.version) return ErrorState;
  const sourceVersion = await Apps.getAppVersion(source.packageName);
  if (
    source.packageName === 'app.revanced.android.youtube' ||
    source.packageName === 'app.revanced.android.apps.youtube.music'
  ) {
    if (!microGSource || !microGSource.version) return ErrorState;
    const microGVersion = await Apps.getAppVersion(microGSource.packageName);
    switch (sourceVersion) {
      case source.version:
        switch (microGVersion) {
          case microGSource.version:
            return {
              type: 'RED',
              message: `${source.title} and MicroG are not installed.`,
            };
          default:
            return {
              type: 'RED',
              message: `MicroG is installed, but ${source.title} is not.`,
            };
        }
      default:
        switch (microGVersion) {
          case microGSource.version:
            return {
              type: 'RED',
              message: `${source.title} is installed, but MicroG is not.`,
            };
          default:
            return {
              type: 'RED',
              message: `${source.title} and MicroG are not installed.`,
            };
        }
    }
  }
  return {
    type: 'RED',
    message: `${source.title} is not installed.`,
  };
};

export async function getWarning(
  source: SourceType,
  microGSource?: SourceType,
): Promise<{type: StateColors; message: string}> {
  const state = await getAppState(source, microGSource);
  switch (state) {
    case 'UP TO DATE':
      return State_UP_TO_DATE(source);
    case 'UPDATE AVAILABLE':
      return await State_UPDATE_AVAILABLE(source, microGSource);
    case 'NOT INSTALLED':
      return await State_NOT_INSTALLED(source, microGSource);
    default:
      return ErrorState;
  }
}
