import React from 'react';
import {SourceProps} from './source';
import {ImageSourcePropType} from 'react-native';

export interface CurrAppProps {
  title: string;
  icon: ImageSourcePropType;
  package: string;
  version: string;
  link: string;
}

export interface CurrAppContextProps {
  app: CurrAppProps | null;
  setApp: (app: SourceProps | null) => void;
}

const CurrAppContext = React.createContext<CurrAppContextProps>({
  app: null,
  setApp: () => {},
});

export function CurrAppProvider({children}: {children: React.ReactNode}) {
  const [app, _setApp] = React.useState<CurrAppProps | null>(null);

  const setApp = (app: SourceProps | null) => {
    if (app) {
      if (app.package && app.version && app.link) _setApp(app as CurrAppProps);
      else throw new Error('Missing package, version or link');
    } else _setApp(null);
  };

  return (
    <CurrAppContext.Provider value={{app, setApp}}>
      {children}
    </CurrAppContext.Provider>
  );
}

export function useCurrApp() {
  const {app, setApp} = React.useContext(CurrAppContext);

  return [app, setApp] as const;
}
