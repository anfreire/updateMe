import {useSource} from '../../../../hooks/useSource';
import GridFeatures from '../../components/features/variants/grid';
import ScreenBase from '../../components/screenBase';
import React from 'react';
import {WhatsappFeatures} from './data';
import {Text} from '@rneui/themed';
import Frame from '../../../../common/frame';

export default function AppsWhatsapp() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.WHATSAPP}>
      <Frame>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          This is a modded version of the official WhatsApp Android app.
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          With this version, you can experience WhatsApp with some additional
          features to make your life easier and enhance your experience.
        </Text>
      </Frame>
      <GridFeatures items={WhatsappFeatures} width={2} />
    </ScreenBase>
  );
}
