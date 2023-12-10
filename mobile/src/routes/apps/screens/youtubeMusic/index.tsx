import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import { View } from 'react-native';
import InstallButton from '../../components/installButton';

export default function AppsYoutubeMusic() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.YOUTUBE_MUSIC} microgSource={source.YOUTUBE_MICROG}>
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
          <InstallButton source={source.YOUTUBE_MUSIC} />
          <InstallButton source={source.YOUTUBE_MICROG} />
        </View>
      </View>
    </ScreenBase>
  );

}
