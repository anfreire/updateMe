import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {HDOContent, HDOFeatures, HDOKeys} from './data';
import {OrderedFeatures} from '../../components/features';
import { InfoCollapse } from '../../components/info';

export default function AppsHDO() {
  const source = useSource()[0];
  return (
    <ScreenBase source={source.HDO}>
      {HDOKeys.map(key => (
        <InfoCollapse key={key} title={key} content={HDOContent[key]} />
      ))}
      <OrderedFeatures features={HDOFeatures} />
    </ScreenBase>
  );
}
