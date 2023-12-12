import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {LongFeatures, ShortFeatures} from '../../components/features';
import {PhotoshopExpressKeys, photoshopExpressContent, photoshopExpressFeatures} from './data';
import { InfoCollapse } from '../../components/info';

export default function AppsPhotoshopExpress() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.PHOTOSHOP_EXPRESS}>
      <ShortFeatures
        title="Unlocked Features"
        features={[
          'Premium Unlocked',
          'No Ads',
          'No Adobe ID Required',
          'AI feautures unlocked',
        ]}
      />
      {PhotoshopExpressKeys.map(key => (
        <InfoCollapse
          key={key}
          title={key}
          content={photoshopExpressContent[key]}
        />
      ))}
      <LongFeatures features={photoshopExpressFeatures} />
    </ScreenBase>
  );
}
