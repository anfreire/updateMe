import React from 'react';
import {SourceType} from './useSource';

export type DownloadDataType = SourceType | null;

export type DownloadProviderProps = {
  data: DownloadDataType;
  setData: React.Dispatch<React.SetStateAction<DownloadDataType>>;
};

export const DownloadContext = React.createContext<DownloadProviderProps>({
  data: null,
  setData: () => {},
});

export function DownloadProvider({children}: {children: React.ReactNode}) {
  const [data, setData] = React.useState<DownloadDataType>(null);

  return (
    <DownloadContext.Provider
      value={{
        data,
        setData,
      }}>
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownload(): {
  data: DownloadDataType;
  setData: React.Dispatch<React.SetStateAction<DownloadDataType>>;
} {
  const context = React.useContext(DownloadContext);
  if (context === undefined) {
    throw new Error('useDownload must be used within a DownloadProvider');
  }
  return {
    data: context.data,
    setData: context.setData,
  };
}
