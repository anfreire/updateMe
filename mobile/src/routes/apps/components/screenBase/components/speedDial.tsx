import React from 'react';
import {Linking} from 'react-native';
import {SpeedDial as SD, Icon, useTheme} from '@rneui/themed';
import {SourceType} from '../../../../../hooks/useSource';
import {useDownload} from '../../../../../hooks/useDownload';

export interface SpeedDialProps {
  source: SourceType;
  microgSource?: SourceType;
}

export default function SpeedDial({source, microgSource}: SpeedDialProps) {
  const {setData} = useDownload();
  const {theme} = useTheme();
  const [open, setOpen] = React.useState(false);
  return (
    <SD
      color={theme.colors.primary}
      isOpen={open}
      icon={<Icon name="add" />}
      openIcon={<Icon name="close" />}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      overlayColor="rgba(0,0,0,0.5)">
      <SD.Action
        color={theme.colors.primary}
        icon={<Icon name="globe" type="feather" size={20} />}
        title={`Visit ${source.title} source`}
        onPress={() => {
          setOpen(false);
          Linking.openURL(source.url);
        }}
      />
      <SD.Action
        color={theme.colors.primary}
        icon={<Icon name="arrow-down" type="feather" size={20} />}
        title={`Download ${source.title}`}
        onPress={() => {
          setOpen(false);
          setData(source);
        }}
      />
      {
        (microgSource && (
          <>
            <SD.Action
              color={theme.colors.primary}
              icon={<Icon name="globe" type="feather" size={20} />}
              title={`Visit ${microgSource.title} source`}
              onPress={() => {
                setOpen(false);
                Linking.openURL(microgSource.url);
              }}
            />
            <SD.Action
              color={theme.colors.primary}
              icon={<Icon name="arrow-down" type="feather" size={20} />}
              title={`Download ${microgSource.title}`}
              onPress={() => {
                setOpen(false);
                setData(microgSource);
              }}
            />
          </>
        )) as any
      }
    </SD>
  );
}
