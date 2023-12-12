import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import React from 'react';

export default function AppsYoutube() {
  const source = useSource()[0];

  return (
    <ScreenBase
      source={source.YOUTUBE_YOUTUBE}
      microgSource={source.YOUTUBE_MICROG}
    />
  );
}
