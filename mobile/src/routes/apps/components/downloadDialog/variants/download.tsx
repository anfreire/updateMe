import {Image, LinearProgress, Overlay, Text} from '@rneui/themed';
import React from 'react';
import {Linking, View} from 'react-native';
import GhostButton from '../../../../../common/ghostButton';
import {useDownload} from '../../../../../hooks/useDownload';
export default function DownloadDialog_Download({
  progress,
}: {
  progress: number;
}) {
  const {data} = useDownload();
  return (
    <Overlay
      isVisible={data !== null}
      onBackdropPress={() => {
        () => {};
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          gap: 25,
        }}>
        <Image
          resizeMode="contain"
          source={data?.icon as any}
          style={{width: 50, height: 50}}
        />
        <Text h4 style={{marginBottom: 10}}>
          Downloading {data?.title}
        </Text>
        <LinearProgress
          variant="determinate"
          color="primary"
          style={{width: 250, height: 10, borderRadius: 5}}
          animation={false}
          value={progress}
        />
        <GhostButton
          text="Download manually"
          color="primary"
          onPress={() => {
            Linking.openURL(data?.link as string);
          }}
        />
      </View>
    </Overlay>
  );
}
