import {SourceType} from '../../../../../hooks/useSource';
import {Icon, Text, useTheme} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import GhostButton from '../../../../../common/ghostButton';
import Frame from '../../../../../common/frame';

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

const MicrogVersion = ({
  source,
  openDownloadDialog,
}: {
  source: SourceType;
  openDownloadDialog: () => void;
}) => (
  <Frame borderColor="YELLOW">
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 5,
      }}>
      <Icon name="info"></Icon>
      <Text style={{fontSize: 17, fontWeight: '700'}}>
        This app requires MicroG to work properly
      </Text>
    </View>
    <GhostButton
      text={
        VariantProps[source.state as 'NOT_INSTALLED' | 'NOT_UPDATED'].text +
        ' MicroG'
      }
      color="yellow"
      onPress={openDownloadDialog}
      rightIcon={{
        name: VariantProps[source.state as 'NOT_INSTALLED' | 'NOT_UPDATED']
          .iconName,
        type: 'material',
      }}
    />
  </Frame>
);

export default function InstallButton({
  source,
  openDownloadDialog,
}: {
  source: SourceType;
  openDownloadDialog: () => void;
}) {
  return source.state === 'NOT_INSTALLED' || source.state === 'NOT_UPDATED' ? (
    source.title === 'MicroG' ? (
      <MicrogVersion source={source} openDownloadDialog={openDownloadDialog} />
    ) : (
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
    )
  ) : null;
}
