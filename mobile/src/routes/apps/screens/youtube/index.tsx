import {SourceType, useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import React from 'react';
import SpeedDial from '../../components/speedDial';

export default function AppsYoutube() {
  const source = useSource()[0];
  const [downloadData, setDownloadData] = React.useState<{
    open: boolean;
    source: null | SourceType;
  }>({open: false, source: null});

  return (
    <>
      <ScreenBase
        source={source.YOUTUBE_YOUTUBE}
        microgSource={source.YOUTUBE_MICROG}
        downloadData={downloadData}
        setDownloadData={setDownloadData}></ScreenBase>
      <SpeedDial
        setDownloadData={setDownloadData}
        source={source.YOUTUBE_YOUTUBE}
        source2={source.YOUTUBE_MICROG}
      />
    </>
  );
}
