import React from 'react';
import {Linking} from 'react-native';
import {SpeedDial as SD, Icon, useTheme} from '@rneui/themed';
import {SourceType} from '../../../hooks/useSource';

export interface SpeedDialProps {
  setDownloadData: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      source: null | SourceType;
    }>
  >;
  source: SourceType;
  source2?: SourceType;
}

export default function SpeedDial({
  setDownloadData,
  source,
  source2,
}: SpeedDialProps) {
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
          setDownloadData({open: true, source: source});
        }}
      />
      {
        (source2 && (
          <>
            <SD.Action
              color={theme.colors.primary}
              icon={<Icon name="globe" type="feather" size={20} />}
              title={`Visit ${source2.title} source`}
              onPress={() => {
                setOpen(false);
                Linking.openURL(source2.url);
              }}
            />
            <SD.Action
              color={theme.colors.primary}
              icon={<Icon name="arrow-down" type="feather" size={20} />}
              title={`Download ${source2.title}`}
              onPress={() => {
                setOpen(false);
                setDownloadData({open: true, source: source2});
              }}
            />
          </>
        )) as any
      }
    </SD>
  );
}
