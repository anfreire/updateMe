import React, {useEffect} from 'react';
import {SourceType} from '../../../hooks/useSource';
import {LoadingState, WarningType, getWarning} from '../../../utils/apps';
import {RefreshControl, ScrollView, View} from 'react-native';
import Warning from './warning';

export default function ScreenBase({
  source,
  microgSource,
  children,
}: {
  source: SourceType;
  microgSource?: SourceType;
  children?: React.ReactNode;
}) {
  const [warning, setWarning] = React.useState<WarningType>(LoadingState);

  const update = () => {
    getWarning(source, microgSource).then(res => {
      setWarning(res);
    });
  };

  useEffect(() => {
    update();
  }, [source, microgSource]);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={false} onRefresh={update} />}>
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
      {children}
    </ScrollView>
  );
}
