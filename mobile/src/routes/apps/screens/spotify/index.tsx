import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {InfoShort} from '../../components/info';
import {Text} from '@rneui/base';
import {ShortFeatures} from '../../components/features';
import {SpotifyFeatures} from './data';
import GridFeatures from '../../components/features/variants/grid';

export default function AppsSpotify() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.SPOTIFY}>
      <ShortFeatures
        title="Unlocked Features"
        features={[
          'No ads',
          'Unlimited skips and shuffle',
          'Seeking, Search and Repeats enabled',
          'Unlocked track selection',
        ]}
      />
      <InfoShort
        title="About"
        content={
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
            }}>
            This Spotify is a modded version of the official Spotify Android
            app. With this version, except for the offline mode, you can
            experience Spotify Premium features for free.
          </Text>
        }
      />
      <GridFeatures items={SpotifyFeatures} width={1} />
    </ScreenBase>
  );
}
