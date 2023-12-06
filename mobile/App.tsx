import { ThemeProvider} from '@rneui/themed';
import React from 'react';
import {useColorScheme} from 'react-native';
import Main from './src';
import {NativeElementsTheme} from './utils/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={NativeElementsTheme(useColorScheme())}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
