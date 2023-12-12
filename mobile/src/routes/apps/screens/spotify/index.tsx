import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';

export default function AppsSpotify() {
  const source = useSource()[0];

  return <ScreenBase source={source.SPOTIFY} />;
}
