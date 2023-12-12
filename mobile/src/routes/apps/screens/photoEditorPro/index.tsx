import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {PhotoEditorProContent, PhotoEditorProKeys} from './data';
import InfoCollapse from '../../components/infoCollapse';
import Features from '../../components/features';

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
      <Features title="Features" features={['Premium Unlocked', 'No Ads']} />
    </ScreenBase>
  );
}
