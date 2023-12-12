import React from 'react';
import {SourceType, useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import SpeedDial from '../../components/speedDial';

export default function AppsInstagram() {
  const source = useSource()[0];
  const [downloadData, setDownloadData] = React.useState<{
    open: boolean;
    source: null | SourceType;
  }>({open: false, source: null});

  return (
    <>
      <ScreenBase
        source={source.INSTAGRAM}
        downloadData={downloadData}
        setDownloadData={setDownloadData}></ScreenBase>
      <SpeedDial source={source.INSTAGRAM} setDownloadData={setDownloadData} />
    </>
  );
}