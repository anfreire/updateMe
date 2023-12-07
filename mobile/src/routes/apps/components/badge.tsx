import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {AppState, getAppState} from '../../../utils/apps';
import {Icon, Button} from '@rneui/themed';
import {SourceType, useSource} from '../../../hooks/useSource';
import {colors} from '../../../utils/theme';

const borderColors: Record<AppState, string> = {
  'NOT INSTALLED': colors.RED.opaque,
  'UP TO DATE': colors.GREEN.opaque,
  'UPDATE AVAILABLE': colors.YELLOW.opaque,
};

const backgroundColors: Record<AppState, string> = {
  'NOT INSTALLED': colors.RED.transparent,
  'UP TO DATE': colors.GREEN.transparent,
  'UPDATE AVAILABLE': colors.YELLOW.transparent,
};

const icons: Record<AppState, {name: string; type: string}> = {
  'NOT INSTALLED': {name: 'close', type: 'material-community'},
  'UP TO DATE': {name: 'check', type: 'material-community'},
  'UPDATE AVAILABLE': {name: 'arrow-up', type: 'material-community'},
};

type AppStateType =
  | 'NOT INSTALLED'
  | 'UP TO DATE'
  | 'UPDATE AVAILABLE'
  | 'LOADING';

export default function Badge({
  appSource,
  microgSource,
}: {
  appSource: SourceType;
  microgSource?: SourceType;
}) {
  const [appState, setAppState] = useState<AppStateType>('LOADING');
  const source = useSource()[0];

  useEffect(() => {
    getAppState(appSource, microgSource).then(state => {
      state ? setAppState(state) : setAppState('LOADING');
    });
  }, [source, microgSource]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      {appState === 'LOADING' ? (
        <Button type="clear" loading />
      ) : (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 5,
            borderRadius: 10,
            backgroundColor: backgroundColors[appState],
            borderWidth: 1,
            borderColor: borderColors[appState],
          }}>
          <Icon
            size={25}
            name={icons[appState].name}
            type={icons[appState].type}
          />
        </View>
      )}
    </View>
  );
}
