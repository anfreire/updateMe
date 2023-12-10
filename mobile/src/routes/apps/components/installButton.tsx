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

export default function InstallButton({
  source,
  setDownloadOpen,
}: {
  source: SourceType;
  setDownloadOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {theme} = useTheme();

  return source.state === 'NOT_INSTALLED' || source.state === 'NOT_UPDATED' ? (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => setDownloadOpen(true)}
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
    </View>
  ) : null;
}
