import {View} from 'react-native';
import {Icon, Text} from '@rneui/themed';
import {IconType} from '@rneui/base';
import {StateColors} from '../../../../../common/types';
import React from 'react';
import {AppState, SourceType} from '../../../../../hooks/useSource';
import ThemeModule from '../../../../../modules/theme';

export interface WarningType {
  type: StateColors;
  message: string;
}

export const LoadingState: WarningType = {
  type: 'yellow',
  message: 'Loading...',
};

export async function getWarning(
  source1: SourceType,
): Promise<{type: StateColors; message: string}> {
  if (!source1.state) return LoadingState;
  const colors: Record<AppState, StateColors> = {
    NOT_INSTALLED: 'red',
    NOT_UPDATED: 'yellow',
    UPDATED: 'green',
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

const icons: Record<StateColors, {name: string; type: IconType}> = {
  green: {name: 'check', type: 'material-community'},
  yellow: {name: 'alert-circle-outline', type: 'material-community'},
  red: {name: 'close', type: 'material-community'},
};

export default function Warning({type, message}: WarningType) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '70%',
        gap: 12,
        padding: 10,
        borderRadius: 5,
        borderColor: ThemeModule.Colors[type].opaque,
        borderWidth: 1,
        backgroundColor: ThemeModule.Colors[type].transparent,
      }}>
      <Icon
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        name={icons[type].name}
        size={25}
        type={icons[type].type}
      />
      <Text
        style={{
          flexShrink: 1,
          flexWrap: 'wrap',
          textAlign: 'center',
          fontSize: 15,
        }}>
        {message}
      </Text>
    </View>
  );
}
