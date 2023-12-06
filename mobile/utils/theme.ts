import {ColorSchemeName} from 'react-native';
import '@rneui/themed';
import {Colors, Theme, createTheme} from '@rneui/themed';
import Storage from '../modules/storage';

interface ExtendedTheme extends Theme {
  colors: Colors;
}
export const greys = {
  1: '#88888840',
  2: '#88888880',
  3: '#888888C0',
};

export type ColorsType = 'RED' | 'GREEN' | 'YELLOW';

export const colors: Record<ColorsType, {transparent: string; opaque: string}> =
  {
    RED: {
      transparent: 'rgba(255, 0, 0, 0.1)',
      opaque: 'rgba(255, 0, 0, 1)',
    },
    GREEN: {
      transparent: 'rgba(0, 255, 0, 0.1)',
      opaque: 'rgba(0, 255, 0, 1)',
    },
    YELLOW: {
      transparent: 'rgba(255, 165, 0, 0.1)',
      opaque: 'rgba(255, 165, 0, 1)',
    },
  };

export async function saveAccentColor(
  accentColor: {
    light: string;
    dark: string;
  },
  theme: any,
) {
  theme.updateTheme({
    lightColors: {
      primary: accentColor.light,
    },
    darkColors: {
      primary: accentColor.dark,
    },
  });
  await Storage.saveData('accentColor', accentColor);
}

export async function getAccentColor() {
  const saved = await Storage.getData('accentColor', 'OBJECT');
  if (saved) return saved as {light: string; dark: string};
  return null;
}

export function NativeElementsTheme(colorScheme: ColorSchemeName) {
  return createTheme({
    mode: colorScheme === 'light' ? 'light' : 'dark',
  });
}

export function NavigationTheme(theme: ExtendedTheme) {
  return {
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.white,
      text: theme.colors.black,
      border: greys[2],
      notification: theme.colors.primary,
    },
    dark: theme.mode === 'dark',
  };
}
