import React, {useEffect} from 'react';
import {SourceType} from '../../../hooks/useSource';
import {WarningType, getWarning} from '../../../utils/apps';
import {RefreshControl, ScrollView, View} from 'react-native';
import Warning from './warning';
import InstallButton from './installButton';

const warningLoading: WarningType = {
  type: 'YELLOW',
  message: 'Loading...',
};

export default function ScreenBase({
  source,
  microgSource,
}: {
  source: SourceType;
  microgSource?: SourceType;
}) {
  const [warning, setWarning] = React.useState<WarningType>(warningLoading);

  const update = () => {
    setWarning(warningLoading);
    getWarning(source, microgSource).then(res => {
      setWarning(res);
    });
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={false} onRefresh={update} />}>
      <View style={{display: 'flex', flex: 1, alignItems: 'center'}}>
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
        <InstallButton source={source} />
        {microgSource && <InstallButton source={microgSource} />}
      </View>
    </ScrollView>
  );
}
