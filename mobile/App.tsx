/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/routes';
import ThemeModule from './src/modules/theme';
import React from 'react';

function App(): JSX.Element {
  const {theme} = useTheme();
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: theme.colors.background,
      }}>
      <NavigationContainer theme={ThemeModule.NavigationTheme(theme)}>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
