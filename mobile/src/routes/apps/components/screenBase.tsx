import React, {useEffect} from 'react';
import {SourceType} from '../../../hooks/useSource';
import {WarningType, getWarning} from '../../../utils/apps';
import {ScrollView, View} from 'react-native';
import Warning from './warning';
import InstallButton from './installButton';

export default function ScreenBase({
  source,
  microgSource,
}: {
  source: SourceType;
  microgSource?: SourceType;
}) {
  const [warning, setWarning] = React.useState<WarningType>({
    type: 'YELLOW',
    message: 'Loading...',
  });

  useEffect(() => {
    getWarning(source, microgSource).then(res => {
      setWarning(res);
    });
  }, []);

  return (
    <ScrollView>
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
