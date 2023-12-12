import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {PhotoEditorProKeys, photoEditorProContent, photoEditorProFeatures} from './data';
import {LongFeatures, ShortFeatures} from '../../components/features';
import {InfoCollapse} from '../../components/info';

export default function AppsPhotoEditorPro() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.PHOTO_EDITOR_PRO}>
      <ShortFeatures
        title="Unlocked Features"
        features={['Premium Unlocked', 'No Ads']}
      />
      {PhotoEditorProKeys.map(key => (
        <InfoCollapse
          key={key}
          title={key}
          content={photoEditorProContent[key]}
        />
      ))}
      <LongFeatures features={photoEditorProFeatures} />
    </ScreenBase>
  );
}
