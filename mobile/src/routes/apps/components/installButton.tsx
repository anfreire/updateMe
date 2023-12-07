import {
  SourceKeysType,
  SourceProps,
  SourceType,
  useSource,
} from '../../../hooks/useSource';
import {
  AppState,
  downloadAndInstall,
  getSingleAppSate,
} from '../../../utils/apps';
import {useEffect, useState} from 'react';
import {Button, Icon} from '@rneui/themed';
import Apps from '../../../modules/apps';

const VariantProps: Record<
  AppState,
  {
    text: string;
    iconName: string;
    disabled: boolean;
  }
> = {
  'UP TO DATE': {
    text: 'Up to date',
    iconName: 'check',
    disabled: true,
  },
  'UPDATE AVAILABLE': {
    text: 'Update',
    iconName: 'update',
    disabled: false,
  },
  'NOT INSTALLED': {
    text: 'Install',
    iconName: 'download',
    disabled: false,
  },
};

export default function InstallButton({source}: {source: SourceType}) {
  const [appState, setAppState] = useState<AppState>('UP TO DATE');

  const VariantOnPress: Record<
    AppState,
    {
      onPress: () => void;
      onProgress?: (progress: number) => void;
    }
  > = {
    'UP TO DATE': {
      onPress: () => {},
    },
    'UPDATE AVAILABLE': {
      onPress: () => {
        downloadAndInstall(source);
      },
    },
    'NOT INSTALLED': {
      onPress: () => {
        downloadAndInstall(source);
      },
    },
  };

  useEffect(() => {
    getSingleAppSate(source).then(res => {
      if (res) setAppState(res);
    });
  }, []);
  return (
    <Button
      disabled={VariantProps[appState].disabled}
      onPress={VariantOnPress[appState].onPress}
      icon={<Icon name={VariantProps[appState].iconName} />}>
      {VariantProps[appState].text}
    </Button>
  );
}
