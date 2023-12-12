import Permissions from '../modules/permissions';
import Files from '../modules/files';
import Apps from '../modules/apps';
import {AppState, SourceType} from '../hooks/useSource';
import {StateColors} from '../common/types';
import {Linking} from 'react-native';

export async function deleteAllFiles(files: string[]): Promise<void> {
  Promise.all(files.map(async file => await Files.deleteFile(file)));
}

export async function downloadAndInstall(
  source: SourceType,
  onProgress?: React.Dispatch<React.SetStateAction<number>>,
): Promise<boolean> {
  if (!source.link) return false;
  try {
    onProgress ||= () => {};
    const granted_write = await Permissions.getPermissions('WRITE');
    if (!granted_write) await Permissions.requestPermissions('WRITE');
    const granted_read = await Permissions.getPermissions('READ');
    if (!granted_read) await Permissions.requestPermissions('READ');
    const path = await Files.download(source.link, source.fileName, onProgress);
    const granted = await Permissions.getPermissions('INSTALL');
    if (!granted) await Permissions.requestPermissions('INSTALL');
    await Apps.installAPK(path);
  } catch (e) {
    console.log(e);
    Linking.openURL(source.link);
    return false;
  }
  return true;
}

export function getMultipleState(
  source1: SourceType,
  source2: SourceType,
): AppState {
  switch (source1.state) {
    case 'NOT_INSTALLED':
      return 'NOT_INSTALLED';
    case 'NOT_UPDATED':
      switch (source2.state) {
        case 'NOT_INSTALLED':
          return 'NOT_INSTALLED';
        default:
          return 'NOT_UPDATED';
      }
    default:
      switch (source2.state) {
        case 'NOT_INSTALLED':
          return 'NOT_INSTALLED';
        case 'NOT_UPDATED':
          return 'NOT_UPDATED';
        default:
          return 'UPDATED';
      }
  }
}

export interface WarningType {
  type: StateColors;
  message: string;
}

export const LoadingState: WarningType = {
  type: 'YELLOW',
  message: 'Loading...',
};

export async function getWarning(
  source1: SourceType,
): Promise<{type: StateColors; message: string}> {
  if (!source1.state) return LoadingState;
  const colors: Record<AppState, StateColors> = {
    NOT_INSTALLED: 'RED',
    NOT_UPDATED: 'YELLOW',
    UPDATED: 'GREEN',
  };
  const messages: Record<AppState, (source: SourceType) => string> = {
    NOT_INSTALLED: (source: SourceType): string => {
      return `${source.title} is not installed`;
    },
    NOT_UPDATED: (source: SourceType): string => {
      return `${source.title} has an update`;
    },
    UPDATED: (source: SourceType): string => {
      return `${source.title} is up to date`;
    },
  };
  return {
    type: colors[source1.state],
    message: messages[source1.state](source1),
  };
}
