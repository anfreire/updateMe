import {ScrollView, Touchable, TouchableOpacity, View} from 'react-native';
import {ToolsScreenTypes} from '..';
import {Icon, Text, useTheme} from '@rneui/themed';
import IListItem from '../../../../common/listItem';

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
    </ScrollView>
  );
}
