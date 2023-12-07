/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {SourceProvider} from './src/hooks/useSource';

const Providers = () => {
  return (
    <SourceProvider>
      <ThemeProvider theme={NativeElementsTheme(useColorScheme())}>
        <App />
      </ThemeProvider>
    </SourceProvider>
  );
};

AppRegistry.registerComponent(appName, () => Providers);
