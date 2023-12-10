import {View} from 'react-native';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import React from 'react';
import InstallButton from '../../components/installButton';

export default function AppsYoutube() {
  const source = useSource()[0];

  return (
    <ScreenBase
      source={source.YOUTUBE_YOUTUBE}
      microgSource={source.YOUTUBE_MICROG}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          margin: 5,
          gap: 10,
        }}>
        <View>
          <InstallButton source={source.YOUTUBE_YOUTUBE} />
          <InstallButton source={source.YOUTUBE_MICROG} />
        </View>
      </View>
    </ScreenBase>
  );
}
