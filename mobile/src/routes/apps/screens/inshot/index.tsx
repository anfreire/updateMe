import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import InfoCollapse from '../../components/infoCollapse';
import {InshotKeys, inshotContent, inshotFeatures} from './data';
import {ShortFeatures} from '../../components/features';

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
