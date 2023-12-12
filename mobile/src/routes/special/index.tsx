import {Text} from '@rneui/themed';
import {View} from 'react-native';
import React from 'react';

export default function SpecialScreen() {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Special</Text>
    </View>
  );
}
