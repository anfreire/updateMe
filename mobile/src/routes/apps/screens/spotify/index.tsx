import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {ShortFeatures} from '../../components/features';
import {SpotifyFeatures} from './data';
import GridFeatures from '../../components/features/variants/grid';
import Frame from '../../../../common/frame';
import {Text} from '@rneui/themed';

export default function AppsSpotify() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.SPOTIFY}>
      <Frame>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          This Spotify is a modded version of the official Spotify Android app.
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          With this version, except for the offline mode, you can experience
          Spotify Premium features for free.
        </Text>
      </Frame>
      <ShortFeatures
        title="Unlocked Features"
        features={[
          'No ads',
          'Unlimited skips and shuffle',
          'Seeking, Search and Repeats enabled',
          'Unlocked track selection',
        ]}
      />
      <GridFeatures items={SpotifyFeatures} width={1} />
    </ScreenBase>
  );
}
