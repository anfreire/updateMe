import {Button, useTheme} from '@rneui/themed';
import {View} from 'react-native';
import {saveAccentColor} from '../../../../utils/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import useScreenOrientation from '../../../../hooks/screenOrientation';

interface AccentColor {
  light: string;
  dark: string;
}

const colors: Record<number, AccentColor> = {
  0: {
    light: '#2089dc',
    dark: '#439ce0',
  },
  1: {
    light: '#ca71eb',
    dark: '#e07be0',
  },
  2: {
    light: '#52c41a',
    dark: '#439946',
  },
  3: {
    light: '#ff190c',
    dark: '#bf2c24',
  },
  4: {
    light: '#faad14',
    dark: '#cfbe27',
  },
  5: {
    light: '#5e6977',
    dark: '#bdc6cf',
  },
};

const Color = ({
  index,
  theme,
}: {
  index: number;
  theme: ReturnType<typeof useTheme>;
}) => {
  const save = (color: AccentColor) => {
    saveAccentColor(color, theme);
  };
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => saveAccentColor(colors[index], theme)}
        style={{
          backgroundColor: colors[index][theme.theme.mode],
          width: 100,
          height: 100,
          borderRadius: 50,
        }}
      />
    </View>
  );
};

const Row = ({
  index1,
  index2,
  index3,
  screenOrientation,
  theme,
}: {
  index1: number;
  index2: number;
  index3: number;
  screenOrientation: ReturnType<typeof useScreenOrientation>;
  theme: ReturnType<typeof useTheme>;
}) => {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
      }}>
      <Color index={index1} theme={theme} />
      <Color index={index2} theme={theme} />
      {screenOrientation === 'LANDSCAPE' && (
        <Color index={index3} theme={theme} />
      )}
    </View>
  );
};

export default function ToolsAccentColor() {
  const theme = useTheme();
  const screenOrientation = useScreenOrientation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: 'flex',
      }}>
      <Row
        index1={0}
        index2={1}
        index3={4}
        screenOrientation={screenOrientation}
        theme={theme}
      />
      <Row
        index1={2}
        index2={3}
        index3={5}
        screenOrientation={screenOrientation}
        theme={theme}
      />
      {screenOrientation === 'PORTRAIT' && (
        <Row index1={4} index2={5} index3={-1} screenOrientation='PORTRAIT' theme={theme} />
      )}
    </SafeAreaView>
  );
}
