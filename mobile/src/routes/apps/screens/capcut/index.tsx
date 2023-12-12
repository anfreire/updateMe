import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {View} from 'react-native';
import {LongFeatures, ShortFeatures} from '../../components/features';
import {CapCutInfo, CapcutFeatures} from './data';
import {InfoCollapse} from '../../components/info';

export default function AppsCapcut() {
  const source = useSource()[0];

  return (
    <>
      <ScreenBase source={source.CAPCUT}>
        <InfoCollapse title={CapCutInfo.title} content={CapCutInfo.content} />
        <View
          style={{
            marginVertical: 10,
          }}>
          <ShortFeatures
            features={['No Watermark', 'No Ads', 'Premium Unlocked']}
          />
        </View>
        <LongFeatures features={CapcutFeatures} />
      </ScreenBase>
    </>
  );
}
