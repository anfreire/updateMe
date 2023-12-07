import {ColorSchemeName} from 'react-native';
import '@rneui/themed';
import {Colors, Theme, createTheme} from '@rneui/themed';
import {StateColors} from '../common/types';

interface ExtendedTheme extends Theme {
  colors: Colors;
}
export const greys = {
  1: '#88888840',
  2: '#88888880',
  3: '#888888C0',
};

export const colors: Record<
  StateColors,
  {transparent: string; opaque: string}
> = {
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
