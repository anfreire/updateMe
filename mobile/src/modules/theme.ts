import {ColorSchemeName} from 'react-native';
import {Colors, Theme, createTheme} from '@rneui/themed';
import {StateColors} from '../common/types';

const colors_rgy: Record<StateColors, {transparent: string; opaque: string}> = {
  red: {
    transparent: 'rgba(255, 0, 0, 0.1)',
    opaque: 'rgba(255, 0, 0, 1)',
  },
  green: {
    transparent: 'rgba(0, 255, 0, 0.1)',
    opaque: 'rgba(0, 255, 0, 1)',
  },
  yellow: {
    transparent: 'rgba(255, 165, 0, 0.1)',
    opaque: 'rgba(255, 165, 0, 1)',
  },
};

const colors_grey: {
  grey: {1: string; 2: string; 3: string};
} = {
  grey: {
    1: '#88888840',
    2: '#88888880',
    3: '#888888C0',
  },
};

namespace ThemeModule {
  export type ExtendedTheme = Theme & {colors: Colors};

  export const Colors = {
    ...colors_rgy,
    ...colors_grey,
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
        border: Colors.grey[2],
        notification: theme.colors.primary,
      },
      dark: theme.mode === 'dark',
    };
  }
}

export default ThemeModule;