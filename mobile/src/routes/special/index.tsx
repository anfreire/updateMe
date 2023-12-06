import {Text} from '@rneui/base';
import {View} from 'react-native';

export default function SpecialScreen() {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Special</Text>
    </View>
  );
}
