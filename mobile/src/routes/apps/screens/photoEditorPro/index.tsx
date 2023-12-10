import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {View} from 'react-native';
import InstallButton from '../../components/installButton';

export default function AppsPhotoEditorPro() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.PHOTO_EDITOR_PRO}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          margin: 5,
          gap: 10,
        }}>
        <View>
          <InstallButton source={source.PHOTO_EDITOR_PRO} />
        </View>
      </View>
    </ScreenBase>
  );
}
