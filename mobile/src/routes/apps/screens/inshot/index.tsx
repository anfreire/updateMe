import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {InshotKeys, inshotContent, inshotFeatures} from './data';
import {ShortFeatures} from '../../components/features';
import { InfoCollapse } from '../../components/info';

export default function AppsInshot() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.INSHOT}>
      {InshotKeys.map(key => (
        <InfoCollapse key={key} title={key} content={inshotContent[key]} />
      ))}
      <ShortFeatures features={inshotFeatures} />
    </ScreenBase>
  );
}
