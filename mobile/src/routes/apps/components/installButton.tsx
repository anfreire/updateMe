import {SourceType, useSource} from '../../../hooks/useSource';
import {
  AppState,
  downloadAndInstall,
  getSingleAppSate,
} from '../../../utils/apps';
import {useEffect, useState} from 'react';
import {
  Button,
  Icon,
  LinearProgress,
  ListItem,
  Text,
  useTheme,
} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {greys} from '../../../utils/theme';
import {Linking} from 'react-native';

type ShowState = 'UPDATE AVAILABLE' | 'NOT INSTALLED';

const VariantProps: Record<
  ShowState,
  {
    text: string;
    iconName: string;
  }
> = {
  'NOT INSTALLED': {
    text: 'Install',
    iconName: 'download',
  },
  'UPDATE AVAILABLE': {
    text: 'Update',
    iconName: 'update',
  },
};

export default function InstallButton({source}: {source: SourceType}) {
  const [gSource, updateSource] = useSource();
  const {theme} = useTheme();
  const [appState, setAppState] = useState<AppState>('UP TO DATE');
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getSingleAppSate(source).then(res => {
      if (res) setAppState(res);
    });
  }, []);

  useEffect(() => {
    getSingleAppSate(source).then(res => {
      if (res) setAppState(res);
    });
  }, [gSource]);

  return appState !== 'UP TO DATE' ? (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
      }}>
      <TouchableOpacity
        onPress={() => {
          setDownloading(true);
          downloadAndInstall(source, setProgress).then(() => {
            setDownloading(false);
            setProgress(0);
            setTimeout(() => updateSource(), 1000);
          });
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
          padding: 10,
          gap: 5,
          borderColor: theme.colors.primary,
          borderWidth: 1,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: theme.colors.primary,
          }}>
          {VariantProps[appState].text + ' ' + source.title}
        </Text>
        <Icon
          color={theme.colors.primary}
          name={VariantProps[appState].iconName}
        />
      </TouchableOpacity>
      {downloading ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            padding: 10,
            margin: 10,
          }}>
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
              borderColor: greys[3],
              borderWidth: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              Linking.openURL(source.link as string);
            }}>
            <Text
              style={{
                color: greys[3],
              }}>
              Download manually
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  ) : null;
}
