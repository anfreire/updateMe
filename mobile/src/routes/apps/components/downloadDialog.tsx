import {Image, LinearProgress, Overlay, Text, useTheme} from '@rneui/themed';
import {useEffect, useState} from 'react';
import React from 'react';
import {SourceType, useSource} from '../../../hooks/useSource';
import {downloadAndInstall} from '../../../utils/apps';
import {Linking, TouchableOpacity, View} from 'react-native';
import {greys} from '../../../utils/theme';

export type DownloadDialogProps = {
  data: {
    open: boolean;
    source: SourceType | null;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      source: SourceType | null;
    }>
  >;
};

export default function DownloadDialog({data, setData}: DownloadDialogProps) {
  const updateSource = useSource()[1];
  const [progress, setProgress] = useState(0);
  const {theme} = useTheme();

  const download = () => {
    if (!data.source) return;
    downloadAndInstall(data.source, setProgress).then(() => {
      const sourceCopy = data.source;
      setData(_ => ({open: false, source: null}));
      setProgress(0);
      setTimeout(() => updateSource(), 10000);
    });
  };

  useEffect(() => {
    if (data.open) {
      download();
    }
  }, [data.open]);
  return (
    <Overlay
      isVisible={data.open}
      onBackdropPress={() => {
        () => setData(_ => ({open: false, source: null}));
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
          source={data.source?.icon as any}
          style={{width: 50, height: 50}}
        />
        <Text h4 style={{marginBottom: 10}}>
          Downloading {data.source?.title}
        </Text>
        <LinearProgress
          color="primary"
          style={{width: 250, height: 10, borderRadius: 5}}
          animation={false}
          value={progress}
        />
        <TouchableOpacity
          style={{
            borderRadius: 5,
            padding: 5,
            borderColor: theme.colors.primary,
            borderWidth: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            Linking.openURL(data.source?.link as string);
          }}>
          <Text
            style={{
              color: theme.colors.primary,
            }}>
            Download manually
          </Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
}
