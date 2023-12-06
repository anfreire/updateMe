import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {useSource} from '../../../../hooks/source';
import IWarning, {WarningType} from '../../../../base/warning';
import {getWarning} from '../../../../utils/apps';
import InstallButton from '../../../../base/installButton';

export default function AppsSpotify() {
  const source = useSource()[0];
  const [warning, setWarning] = React.useState<{
    type: WarningType;
    message: string;
  }>({
    type: 'WARNING',
    message: 'Loading...',
  });

  useEffect(() => {
    getWarning(
      source.SPOTIFY.package as string,
      source.SPOTIFY.version as string,
    ).then(res => {
      setWarning(res);
    });
  }, [source]);

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
          <IWarning type={warning.type} text={warning.message} />
        </View>
        <InstallButton packageName={source.SPOTIFY.package as string} />
      </View>
    </ScrollView>
  );
}
