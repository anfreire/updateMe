import {View} from 'react-native';
import {colors} from '../utils/theme';
import {Icon, Text} from '@rneui/themed';

export type WarningType = 'OK' | 'WARNING' | 'ERROR';

const colorsTranslator: Record<WarningType, 'GREEN' | 'YELLOW' | 'RED'> = {
  OK: 'GREEN',
  WARNING: 'YELLOW',
  ERROR: 'RED',
};

export type IconType =
  | 'material'
  | 'material-community'
  | 'ionicon'
  | 'font-awesome'
  | 'font-awesome-5'
  | 'simple-line-icon'
  | 'octicon'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'antdesign'
  | 'fontisto'
  | 'feather'
  | 'zocial'
  | 'material-community';

const icons: Record<WarningType, {name: string; type: IconType}> = {
  OK: {name: 'check', type: 'material-community'},
  WARNING: {name: 'alert-circle-outline', type: 'material-community'},
  ERROR: {name: 'close', type: 'material-community'},
};

export interface IWarningProps {
  type: WarningType;
  text: string;
}

export default function IWarning({type, text}: IWarningProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        maxWidth: '70%',
        gap: 12,
        padding: 10,
        borderRadius: 5,
        borderColor: colors[colorsTranslator[type]].opaque,
        borderWidth: 1,
        backgroundColor: colors[colorsTranslator[type]].transparent,
      }}>
      <Icon name={icons[type].name} size={25} type={icons[type].type} />
      <Text
        style={{
          flexShrink: 1,
          flexWrap: 'wrap',
          textAlign: 'center',
          fontSize: 15,
        }}>
        {text}
      </Text>
    </View>
  );
}
