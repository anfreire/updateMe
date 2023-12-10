import React from 'react';
import {SourceType, useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import SpeedDial from '../../components/speedDial';

export default function AppsSpotify() {
  const source = useSource()[0];
  const [downloadData, setDownloadData] = React.useState<{
    open: boolean;
    source: null | SourceType;
  }>({open: false, source: null});

  return (
    <>
      <ScreenBase
        source={source.SPOTIFY}
        downloadData={downloadData}
        setDownloadData={setDownloadData}></ScreenBase>
      <SpeedDial source={source.SPOTIFY} setDownloadData={setDownloadData} />
    </>
  );
}
