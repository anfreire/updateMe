import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {View} from 'react-native';
import {greys} from '../../../../utils/theme';
import {Text} from '@rneui/themed';
import {GridFeautures} from '../../components/features';
import {InstagramFeatures} from './data';
import {InfoShort} from '../../components/info';

export default function AppsInstagram() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.INSTAGRAM}>
      <InfoShort
        title="About"
        content={
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
            }}>
            Instander is a free modification of the Instagram app for android.
            It contains many improvements over the original application.
          </Text>
        }
      />
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
