import {SourceProps, useSource} from '../hooks/useSource';
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

const ButtonUpdate = ({source}: {source: SourceProps}) => (
  <Button onPress={() => downloadAndInstall(source.link)} color={'primary'}>
    Update
    <Icon name="update" type="material" />
  </Button>
);

const ButtonInstall = ({source}: {source: SourceProps}) => (
  <Button onPress={() => downloadAndInstall(source.link)} color={'primary'}>
    Install
    <Icon name="download" type="material" />
  </Button>
);

const ButtonUninstall = ({packageName}: {packageName: string}) => (
  <Button onPress={() => Apps.uninstallApp(packageName)} color="error">
    Uninstall
    <Icon name="delete" type="material" />
  </Button>
);

export default function InstallButton({packageName}: {packageName: string}) {
  const [appState, setAppState] = useState<AppState>('UP TO DATE');
  const source = useSource()[0];
  const mySource = (source as any)[(packageToKeys as any)[packageName]];

  useEffect(() => {
    getSingleAppSate(packageName, mySource.version).then(res => {
      setAppState(res);
    });
  }, []);
  return appState === 'UP TO DATE' ? (
    <ButtonUninstall packageName={packageName} />
  ) : appState === 'UPDATE AVAILABLE' ? (
    <ButtonUpdate source={mySource} />
  ) : (
    <ButtonInstall source={mySource} />
  );
}
