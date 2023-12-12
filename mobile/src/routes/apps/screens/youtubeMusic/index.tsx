import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {GridFeautures} from '../../components/features';
import {YoutubeMusicFeatures} from './data';
import {Text} from '@rneui/themed';
import Frame from '../../../../common/frame';

export default function AppsYoutubeMusic() {
  const source = useSource()[0];

  return (
    <ScreenBase
      source={source.YOUTUBE_MUSIC}
      microgSource={source.YOUTUBE_MICROG}>
      <Frame>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 19,
          }}>
          This is a modified version of the official YouTube Music app that
          offers a number of premium features for free, including background
          playback, ad-free listening, and higher audio quality.
        </Text>
      </Frame>
      <GridFeautures items={YoutubeMusicFeatures} width={2} />
    </ScreenBase>
  );
}
