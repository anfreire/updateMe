import React from 'react';
import {SourceType, useSource} from '../../../../hooks/useSource';
import ScreenBase from '../../components/screenBase';
import {View} from 'react-native';
import InstallButton from '../../components/installButton';
import SpeedDial from '../../components/speedDial';

export default function AppsPhotoEditorPro() {
  const source = useSource()[0];
  const [downloadData, setDownloadData] = React.useState<{
    open: boolean;
    source: null | SourceType;
  }>({open: false, source: null});

  return (
    <>
      <ScreenBase
        source={source.PHOTO_EDITOR_PRO}
        downloadData={downloadData}
        setDownloadData={setDownloadData}></ScreenBase>
      <SpeedDial
        source={source.PHOTO_EDITOR_PRO}
        setDownloadData={setDownloadData}
      />
    </>
  );
}
