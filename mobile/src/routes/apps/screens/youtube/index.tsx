import {useSource} from '../../../../hooks/useSource';
import { ShortFeatures} from '../../components/features';
import {InfoShort} from '../../components/info';
import ScreenBase from '../../components/screenBase';
import React from 'react';
import {AppealingFeatures, YoutubeCOmpleteFeautures} from './data';
import GridFeatures from '../../components/features/variants/grid';

export default function AppsYoutube() {
  const source = useSource()[0];

  return (
    <ScreenBase
      source={source.YOUTUBE_YOUTUBE}
      microgSource={source.YOUTUBE_MICROG}>
      <InfoShort
        title="About"
        content="This Youtube version is a free and open-source modification of the official YouTube app for Android. It offers a number of features that are not available in the official app like built-in adblocking, background playback without Youtube Premium, dark mode, and much more."
      />
      <GridFeatures items={AppealingFeatures} width={2} />
      <ShortFeatures
        title="All Feautures"
        features={YoutubeCOmpleteFeautures}
      />
    </ScreenBase>
  );
}
