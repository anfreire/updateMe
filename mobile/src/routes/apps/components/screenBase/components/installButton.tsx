import {SourceType} from '../../../../../hooks/useSource';
import {Icon, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import GhostButton from '../../../../../common/ghostButton';

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
  openDownloadDialog,
}: {
  source: SourceType;
  openDownloadDialog: () => void;
}) {
  return source.state === 'NOT_INSTALLED' || source.state === 'NOT_UPDATED' ? (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <GhostButton
        text={VariantProps[source.state].text + ' ' + source.title}
        color="primary"
        onPress={openDownloadDialog}
        rightIcon={{
          name: VariantProps[source.state].iconName,
          type: 'material',
        }}
      />
    </View>
  ) : null;
}
