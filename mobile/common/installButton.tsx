import {SourceProps, useSource} from '../hooks/source';
import {
  AppState,
  downloadAndInstall,
  getAppState,
  getSingleAppSate,
  packageToKeys,
} from '../utils/apps';
import {useEffect, useState} from 'react';
import {Button, Icon} from '@rneui/themed';
import Apps from '../modules/apps';

const text = {
  'UPDATE AVAILABLE': 'Update',
  'NOT INSTALLED': 'Install',
  'UP TO DATE': 'Uninstall',
};

const icons = {
  'UPDATE AVAILABLE': 'update',
  'NOT INSTALLED': 'download',
  'UP TO DATE': 'delete',
};

const onPress = (source: SourceProps, appState: AppState) => {
  switch (appState) {
    case 'UPDATE AVAILABLE':
      downloadAndInstall(source.link);
    case 'NOT INSTALLED':
      downloadAndInstall(source.link);
    case 'UP TO DATE':
      Apps.uninstallApp(source.package as string);
  }
};

export default function InstallButton({packageName}: {packageName: string}) {
  const [appState, setAppState] = useState<AppState>('UP TO DATE');
  const source = useSource()[0];

  useEffect(() => {
    getSingleAppSate(
      packageName,
      (source as any)[(packageToKeys as any)[packageName]]['version'],
    ).then(res => {
      setAppState(res);
    });
  }, []);
  return (
    <Button
      onPress={() =>
        onPress((source as any)[(packageToKeys as any)[packageName]], appState)
      }
      color={appState === 'UP TO DATE' ? 'error' : 'primary'}>
      {text[appState]}
      <Icon name={icons[appState]} type="material" />
    </Button>
  );
}
