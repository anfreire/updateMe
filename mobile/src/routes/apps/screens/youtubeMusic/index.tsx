import React from 'react';
import {SourceType, useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import SpeedDial from '../../components/speedDial';

export default function AppsYoutubeMusic() {
  const source = useSource()[0];
  const [downloadData, setDownloadData] = React.useState<{
    open: boolean;
    source: null | SourceType;
  }>({open: false, source: null});

  return (
    <>
      <ScreenBase
        source={source.YOUTUBE_MUSIC}
        microgSource={source.YOUTUBE_MICROG}
        downloadData={downloadData}
        setDownloadData={setDownloadData}></ScreenBase>
      <SpeedDial
        setDownloadData={setDownloadData}
        source={source.YOUTUBE_MUSIC}
        source2={source.YOUTUBE_MICROG}
      />
    </>
  );
}
