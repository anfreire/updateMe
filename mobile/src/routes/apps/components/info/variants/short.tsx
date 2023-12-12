import {View} from 'react-native';
import {greys} from '../../../../../utils/theme';
import {Text} from '@rneui/themed';
import React from 'react';

export interface InfoShortProps {
  title: string;
  content: React.ReactNode;
}

export default function InfoShort({title, content}: InfoShortProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: greys[2],
        gap: 15,
        padding: 15,
      }}>
      <Text h3>{title}</Text>
      {content}
    </View>
  );
}
