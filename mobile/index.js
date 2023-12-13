/**
 * @format
 */

import {AppRegistry, useColorScheme} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {SourceProvider} from './src/hooks/useSource';
import {ThemeProvider} from '@rneui/themed';
import {DownloadProvider} from './src/hooks/useDownload';
import ThemeModule from './src/modules/theme';

const Providers = () => {
  return (
    <SourceProvider>
      <DownloadProvider>
        <ThemeProvider
          theme={ThemeModule.NativeElementsTheme(useColorScheme())}>
          <App />
        </ThemeProvider>
      </DownloadProvider>
    </SourceProvider>
  );
};

AppRegistry.registerComponent(appName, () => Providers);
