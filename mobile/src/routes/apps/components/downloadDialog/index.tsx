import {useEffect, useState} from 'react';
import React from 'react';
import {useSource} from '../../../../hooks/useSource';
import {downloadAndInstall} from '../../../../utils/apps';
import {useDownload} from '../../../../hooks/useDownload';
import DownloadDialog_Download from './variants/download';
import DownloadDialog_Warning from './variants/warning';

export default function DownloadDialog() {
  const updateSource = useSource()[1];
  const download = useDownload();
  const [progress, setProgress] = useState(0);
  const [warningsAccepted, setWarningsAccepted] = useState(false);

  useEffect(() => {
    if (download.data && warningsAccepted) {
      downloadAndInstall(download.data, setProgress).then(() => {
        download.setData(null);
        setProgress(0);
        setWarningsAccepted(false);
        setTimeout(() => updateSource(), 10000);
      });
    }
  }, [download.data, warningsAccepted]);

  return warningsAccepted ? (
    <DownloadDialog_Download progress={progress} />
  ) : (
    <DownloadDialog_Warning setWarningsAccepted={setWarningsAccepted} />
  );
}
