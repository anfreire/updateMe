import {useSource} from '../../../../hooks/useSource';
import GridFeatures from '../../components/features/variants/grid';
import ScreenBase from '../../components/screenBase';
import React from 'react';
import {WhatsappFeatures} from './data';
import {InfoShort} from '../../components/info';

export default function AppsWhatsapp() {
  const source = useSource()[0];

  return (
    <ScreenBase source={source.WHATSAPP}>
      <InfoShort
        title="About"
        content="This is a modded version of the official WhatsApp Android app. With this version, you can experience WhatsApp with some additional features to make your life easier and enhance your experience."
      />
      <GridFeatures items={WhatsappFeatures} width={2} />
    </ScreenBase>
  );
}
