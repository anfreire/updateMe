import React, {useEffect} from 'react';
import {SourceType, useSource} from '../../../../hooks/useSource';
import {useDownload} from '../../../../hooks/useDownload';
import {LoadingState, WarningType, getWarning} from '../../../../utils/apps';
import {RefreshControl, ScrollView, View} from 'react-native';
import Warning from './components/warning';
import InstallButton from './components/installButton';
import SpeedDial from './components/speedDial';

export default function ScreenBase({
  source,
  microgSource,
  children,
}: {
  source: SourceType;
  microgSource?: SourceType;
  children?: React.ReactNode;
}) {
  const {setData} = useDownload();
  const [warning, setWarning] = React.useState<WarningType>(LoadingState);
  const updateSource = useSource()[1];

  const update = () => {
    updateSource();
  };

  useEffect(() => {
    getWarning(source).then(res => {
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
            gap: 20,
            marginBottom: 100,
          }}>
          <InstallButton
            source={source}
            openDownloadDialog={() => setData(source)}
          />
          {microgSource && (
            <InstallButton
              source={microgSource}
              openDownloadDialog={() => setData(microgSource)}
            />
          )}
          {children}
        </View>
      </ScrollView>
      <SpeedDial source={source} microgSource={microgSource} />
    </>
  );
}
