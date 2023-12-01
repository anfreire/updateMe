import * as React from 'react';
import {MD3LightTheme as DefaultTheme, MD3Theme} from 'react-native-paper';

interface MyTheme extends MD3Theme {
  border1: string;
  border2: string;
  border3: string;
}

const theme: MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    onPrimary: '#ffffff',
    primaryContainer: '#000000',
    onPrimaryContainer: '#ffffff',
    secondary: '#000000',
    onSecondary: '#ffffff',
    secondaryContainer: '#000000',
    onSecondaryContainer: '#ffffff',
    surface: '#000000',
    onSurface: '#ffffff',
    background: '#000000',
    onBackground: '#ffffff',
    error: '#a80000',
    onError: '#ffffff',
  },
  border1: '#242424',
  border2: '#3b3b3b',
  border3: '#4a4a4a',
};

export default theme;
