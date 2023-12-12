import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {View} from 'react-native';
import {greys} from '../../../../utils/theme';
import {Text} from '@rneui/themed';
import {GridFeautures} from '../../components/features';
import {InstagramFeatures} from './data';

export default function AppsInstagram() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.INSTAGRAM}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: 30,
          marginTop: 10,
        }}>
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
          <Text h3>About</Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              marginBottom: 10,
            }}>
            Instander is a free modification of the Instagram app for android.
            It contains many improvements over the original application.
          </Text>
        </View>
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
      </View>
    </ScreenBase>
  );
}
