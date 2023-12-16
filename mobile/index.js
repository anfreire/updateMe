/**
 * @format
 */

import {AppRegistry, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import App from './App';
import {name as appName} from './app.json';
import {SourceProvider} from './src/hooks/useSource';
import {ThemeProvider} from '@rneui/themed';
import {DownloadProvider} from './src/hooks/useDownload';
import ThemeModule from './src/modules/theme';
import NotificationsModule from './src/modules/notification';

NotificationsModule.background();

const Providers = () => {
  useEffect(() => {
    NotificationsModule.addTokenToDatabase();
  });
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
