import React, {useEffect} from 'react';
import {SourceType, useSource} from '../../../hooks/useSource';
import {LoadingState, WarningType, getWarning} from '../../../utils/apps';
import {RefreshControl, ScrollView, View} from 'react-native';
import Warning from './warning';
import InstallButton from './installButton';
import DownloadDialog from './downloadDialog';

export default function ScreenBase({
  source,
  downloadData,
  setDownloadData,
  microgSource,
  children,
}: {
  source: SourceType;
  downloadData: {
    open: boolean;
    source: null | SourceType;
  };
  setDownloadData: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      source: null | SourceType;
    }>
  >;
  microgSource?: SourceType;
  children?: React.ReactNode;
}) {
  const [warning, setWarning] = React.useState<WarningType>(LoadingState);
  const updateSource = useSource()[1];

  const update = () => {
    updateSource();
  };

  useEffect(() => {
    getWarning(source, microgSource).then(res => {
      setWarning(res);
    });
  }, [source, microgSource]);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={update} />
        }>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            margin: 5,
          }}>
          <Warning {...warning} />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
            margin: 5,
            gap: 10,
            marginBottom: 100,
          }}>
          <InstallButton
            source={source}
            setDownloadOpen={() =>
              setDownloadData({open: true, source: source})
            }
          />
          {microgSource && (
            <InstallButton
              source={microgSource}
              setDownloadOpen={() =>
                setDownloadData({open: true, source: microgSource})
              }
            />
          )}
          {children}
        </View>
      </ScrollView>
      <DownloadDialog data={downloadData} setData={setDownloadData} />
    </>
  );
}
