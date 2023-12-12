import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import Features from '../../components/features';

export default function AppsPhotoshopExpress() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.PHOTOSHOP_EXPRESS}>
      <Features title="Features" features={['Premium Unlocked', 'No Ads']} />
    </ScreenBase>
  );
}
