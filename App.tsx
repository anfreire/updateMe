import {PaperProvider, Portal} from 'react-native-paper';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import theme from './modules/theme';
import {DownloadModal} from './pages/home/components/downloadModal';
import Pages from './pages';

const Modals = () => {
  return (
    <Portal>
      <DownloadModal />
    </Portal>
  );
};

function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Modals />
        <Pages />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
