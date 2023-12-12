import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {View} from 'react-native';
import {greys} from '../../../../utils/theme';
import {Text} from '@rneui/themed';
import {GridFeautures} from '../../components/features';
import {InstagramFeatures} from './data';
import Frame from '../../../../common/frame';

export default function AppsInstagram() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.INSTAGRAM}>
      <Frame>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          Instander is a free modification of the Instagram app for android.
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          It contains many improvements over the original application.
        </Text>
      </Frame>
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
        <Text h3>Features</Text>
        <GridFeautures items={InstagramFeatures} />
      </View>
    </ScreenBase>
  );
}
