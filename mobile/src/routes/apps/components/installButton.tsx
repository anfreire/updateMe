import {SourceType, useSource} from '../../../hooks/useSource';
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
import {downloadAndInstall} from '../../../utils/apps';

const VariantProps: Record<
  'NOT_INSTALLED' | 'NOT_UPDATED',
  {
    text: string;
    iconName: string;
  }
> = {
  NOT_INSTALLED: {
    text: 'Install',
    iconName: 'download',
  },
  NOT_UPDATED: {
    text: 'Update',
    iconName: 'update',
  },
};

export default function InstallButton({source}: {source: SourceType}) {
  const updateSource = useSource()[1];
  const {theme} = useTheme();
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  return source.state === 'NOT_INSTALLED' || source.state === 'NOT_UPDATED' ? (
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
          {VariantProps[source.state].text + ' ' + source.title}
        </Text>
        <Icon
          color={theme.colors.primary}
          name={VariantProps[source.state].iconName}
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
