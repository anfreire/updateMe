import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Icon, Button} from '@rneui/themed';
import {AppState, SourceType, useSource} from '../../../hooks/useSource';
import {colors} from '../../../utils/theme';
import React from 'react';
import {getMultipleState} from '../../../utils/apps';

const borderColors: Record<AppState, string> = {
  NOT_INSTALLED: colors.RED.opaque,
  NOT_UPDATED: colors.YELLOW.opaque,
  UPDATED: colors.GREEN.opaque,
};

const backgroundColors: Record<AppState, string> = {
  NOT_INSTALLED: colors.RED.transparent,
  NOT_UPDATED: colors.YELLOW.transparent,
  UPDATED: colors.GREEN.transparent,
};

const icons: Record<AppState, {name: string; type: string}> = {
  NOT_INSTALLED: {name: 'close', type: 'material-community'},
  NOT_UPDATED: {name: 'arrow-up', type: 'material-community'},
  UPDATED: {name: 'check', type: 'material-community'},
};

export default function Badge({
  appSource,
  microgSource,
}: {
  appSource: SourceType;
  microgSource?: SourceType;
}) {
  const [appState, setAppState] = useState<AppState | "LOADING">(
    microgSource?.state
      ? getMultipleState(appSource, microgSource)
      : appSource.state ?? "LOADING",
  );
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
