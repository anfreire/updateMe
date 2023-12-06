import {ScrollView, View} from 'react-native';
import {useSource} from '../../../../hooks/source';
import IWarning, {WarningType} from '../../../../base/warning';
import React, {useEffect} from 'react';
import {getWarning} from '../../../../utils/apps';
import InstallButton from '../../../../base/installButton';

export default function AppsYoutube() {
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
      source.YOUTUBE_YOUTUBE.package as string,
      source.YOUTUBE_YOUTUBE.version as string,
      source.YOUTUBE_MICROG.version as string,
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
        <InstallButton packageName={source.YOUTUBE_YOUTUBE.package as string} />
        <InstallButton packageName={source.YOUTUBE_MICROG.package as string} />
      </View>
    </ScrollView>
  );
}
