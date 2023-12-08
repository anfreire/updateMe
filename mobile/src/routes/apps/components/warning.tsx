import {View} from 'react-native';
import {colors} from '../../../utils/theme';
import {Icon, Text} from '@rneui/themed';
import {IconType} from '@rneui/base';
import {StateColors} from '../../../common/types';
import {WarningType} from '../../../utils/apps';
import React from 'react';

const icons: Record<StateColors, {name: string; type: IconType}> = {
  GREEN: {name: 'check', type: 'material-community'},
  YELLOW: {name: 'alert-circle-outline', type: 'material-community'},
  RED: {name: 'close', type: 'material-community'},
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
        borderColor: colors[type].opaque,
        borderWidth: 1,
        backgroundColor: colors[type].transparent,
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
