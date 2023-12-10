import {View} from 'react-native';
import {SourceType, useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import React from 'react';
import InstallButton from '../../components/installButton';
import SpeedDial from '../../components/speedDial';

export default function AppsWhatsapp() {
  const source = useSource()[0];
  const [downloadData, setDownloadData] = React.useState<{
    open: boolean;
    source: null | SourceType;
  }>({open: false, source: null});

  return (
    <>
      <ScreenBase
        source={source.WHATSAPP}
        downloadData={downloadData}
        setDownloadData={setDownloadData}></ScreenBase>
      <SpeedDial source={source.WHATSAPP} setDownloadData={setDownloadData} />
    </>
  );
}
