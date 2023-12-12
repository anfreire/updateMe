/**
 * @format
 */

import {AppRegistry, useColorScheme} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {SourceProvider} from './src/hooks/useSource';
import {ThemeProvider} from '@rneui/themed';
import {NativeElementsTheme} from './src/utils/theme';
import {DownloadProvider} from './src/hooks/useDownload';

const Providers = () => {
  return (
    <SourceProvider>
      <DownloadProvider>
        <ThemeProvider theme={NativeElementsTheme(useColorScheme())}>
          <App />
        </ThemeProvider>
      </DownloadProvider>
    </SourceProvider>
  );
};

AppRegistry.registerComponent(appName, () => Providers);
