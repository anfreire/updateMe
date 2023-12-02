import {TouchableOpacity, View} from 'react-native';
import {Icon, Text, IconButton, Chip} from 'react-native-paper';

interface AppItemProps {
  title: string;
  iconSource: string;
  iconColor: string;
}

const chipColors = {
  INSTALLED: 'rgba(0, 255, 0, 0.3)',
  NOT_INSTALLED: 'rgba(255, 0, 0, 0.3)',
  OUTDATED: 'rgba(250, 167, 0, 0.3)',
};
const chipText = {
  INSTALLED: 'Installed',
  NOT_INSTALLED: 'Not Installed',
  OUTDATED: 'Outdated',
};

export default function AppItem({title, iconSource, iconColor}: AppItemProps) {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          gap: 10,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
          }}>
          <Icon size={70} color={iconColor} source={iconSource} />
          <Text
            style={{
              fontSize: 25,
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 5,
          }}>
          <View
            style={{
              backgroundColor: chipColors.OUTDATED,
              borderRadius: 5,
              padding: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.4)',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.5)',
              }}>
              {chipText.NOT_INSTALLED}
            </Text>
          </View>
          <IconButton icon="chevron-right" size={30} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
