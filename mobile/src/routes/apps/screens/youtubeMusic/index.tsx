import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {InfoShort} from '../../components/info';
import {GridFeautures} from '../../components/features';
import {YoutubeMusicFeatures} from './data';

export default function AppsYoutubeMusic() {
  const source = useSource()[0];

  return (
    <ScreenBase
      source={source.YOUTUBE_MUSIC}
      microgSource={source.YOUTUBE_MICROG}>
      <InfoShort
        title="About"
        content="This is a modified version of the official YouTube Music app that offers a number of premium features for free, including background playback, ad-free listening, and higher audio quality."
      />
      <GridFeautures items={YoutubeMusicFeatures} width={2} />
    </ScreenBase>
  );
}
