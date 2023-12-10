import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './src/routes';
import {NavigationTheme} from './src/utils/theme';
import React from 'react';

function App(): JSX.Element {
  const {theme} = useTheme();
  return (
    <SafeAreaProvider
      style={{
        backgroundColor: theme.colors.background,
      }}>
      <NavigationContainer theme={NavigationTheme(theme)}>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
