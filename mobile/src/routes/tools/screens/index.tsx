import {ScrollView, Share} from 'react-native';
import {ToolsScreenTypes} from '..';
import {Icon, useTheme} from '@rneui/themed';
import IListItem from '../../../common/listItem';
import React from 'react';

export default function ToolsMain({
  navigation,
}: ToolsScreenTypes.StackScreenProps<'Tools-Main'>) {
  const {theme} = useTheme();

  return (
    <ScrollView
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <IListItem
        title="Change accent color"
        icon={
          <Icon
            size={40}
            color={theme.colors.primary}
            name="palette"
            type="material"
          />
        }
        onPress={() => {
          navigation.navigate('Tools-Accent' as never);
        }}
      />
      <IListItem
        title="Downloads"
        icon={
          <Icon
            size={40}
            name="folder-download"
            type="material-community"
            color={theme.colors.primary}
          />
        }
        onPress={() => {
          navigation.navigate('Tools-Downloads' as never);
        }}
      />
      <IListItem
        title="Updates"
        icon={
          <Icon
            size={40}
            name="update"
            type="material"
            color={theme.colors.primary}
          />
        }
        onPress={() => {
          navigation.navigate('Tools-Updates' as never);
        }}
      />
      <IListItem
        title="Report a problem"
        icon={
          <Icon
            size={40}
            name="bug-report"
            type="material"
            color={theme.colors.primary}
          />
        }
        onPress={() => {
          navigation.navigate('Tools-Report' as never);
        }}
      />
      <IListItem
        title="Share this app"
        icon={
          <Icon
            size={40}
            name="share"
            type="material"
            color={theme.colors.primary}
          />
        }
        onPress={() => {
          Share.share({
            title: 'Share this app',
            message: 'https://anfreire.github.io/updateMe/updateMe.apk',
            url: 'https://anfreire.github.io/updateMe/updateMe.apk',
          });
        }}
      />
    </ScrollView>
  );
}
