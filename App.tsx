import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/home';
import {
  Icon,
  IconButton,
  PaperProvider,
  Portal,
  Text,
  adaptNavigationTheme,
  useTheme,
} from 'react-native-paper';

const Stack = createNativeStackNavigator();

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  StatusBar,
  TouchableHighlight,
  View,
  useColorScheme,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import theme from './modules/theme';
import {TouchableOpacity} from 'react-native';
import {DownloadModal} from './pages/home/components/downloadModal';
import {RecoilRoot} from 'recoil';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Portal>
          <DownloadModal />
        </Portal>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
