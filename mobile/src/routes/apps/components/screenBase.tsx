import React, {useEffect} from 'react';
import {SourceType, useSource} from '../../../hooks/useSource';
import {WarningType, getWarning} from '../../../utils/apps';
import {RefreshControl, ScrollView, View} from 'react-native';
import Warning from './warning';

const warningLoading: WarningType = {
  type: 'YELLOW',
  message: 'Loading...',
};

export default function ScreenBase({
  source,
  microgSource,
  children,
}: {
  source: SourceType;
  microgSource?: SourceType;
  children?: React.ReactNode;
}) {
  const [warning, setWarning] = React.useState<WarningType>(warningLoading);
  const gSource = useSource()[0];

  const update = () => {
    setWarning(warningLoading);
    getWarning(source, microgSource).then(res => {
      setWarning(res);
    });
  };

  useEffect(() => {
    update();
  }, []);

  useEffect(() => {
    update();
  }, [gSource]);

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
