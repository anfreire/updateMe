/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {SourceProvider} from './hooks/useSource';
import {CurrAppProvider} from './hooks/currApp';

const Providers = () => {
  return (
    <SourceProvider>
      <CurrAppProvider>
        <App />
      </CurrAppProvider>
    </SourceProvider>
  );
};

AppRegistry.registerComponent(appName, () => Providers);
