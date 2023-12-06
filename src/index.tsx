import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from '@rneui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from './routes';
import {NavigationTheme} from '../utils/theme';

function Main() {
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

export default Main;
