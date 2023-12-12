import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {PhotoEditorProContent, PhotoEditorProKeys} from './data';
import {ShortFeatures} from '../../components/features';
import {InfoCollapse} from '../../components/info';

export default function AppsPhotoEditorPro() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.PHOTO_EDITOR_PRO}>
      {PhotoEditorProKeys.map(key => (
        <InfoCollapse
          key={key}
          title={key}
          content={PhotoEditorProContent[key]}
        />
      ))}
      <ShortFeatures features={['Premium Unlocked', 'No Ads']} />
    </ScreenBase>
  );
}
