import {useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import React from 'react';

export default function AppsWhatsapp() {
  const source = useSource()[0];

  return <ScreenBase source={source.WHATSAPP} />;
}
