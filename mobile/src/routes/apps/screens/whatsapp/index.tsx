import { View } from 'react-native';
import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import React from 'react';
import InstallButton from '../../components/installButton';

export default function AppsWhatsapp() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.WHATSAPP}>
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
          <InstallButton source={source.WHATSAPP} />
        </View>
      </View>
    </ScreenBase>
  );
}
