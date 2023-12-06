import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {getIndex} from '../utils/apps';

export const SourceKeys: SourceKeysType[] = [
  'HDO',
  'YOUTUBE_YOUTUBE',
  'YOUTUBE_MICROG',
  'YOUTUBE_MUSIC',
  'SPOTIFY',
];

export type SourceKeysType =
  | 'HDO'
  | 'YOUTUBE_MICROG'
  | 'YOUTUBE_YOUTUBE'
  | 'YOUTUBE_MUSIC'
  | 'SPOTIFY';

export interface SourceProps {
  title: string;
  icon: ImageSourcePropType;
  package?: string;
  version?: string;
  link?: string;
}

export type SourceType = Record<SourceKeysType, SourceProps>;

export const initialSource: SourceType = {
  HDO: {
    title: 'HDO',
    icon: require('../assets/hdo.png'),
  },
  YOUTUBE_MICROG: {
    title: 'MicroG',
    icon: require('../assets/microg.png'),
  },
  YOUTUBE_YOUTUBE: {
    title: 'YouTube',
    icon: require('../assets/youtube.png'),
  },
  YOUTUBE_MUSIC: {
    title: 'YouTube Music',
    icon: require('../assets/youtube_music.png'),
  },
  SPOTIFY: {
    title: 'Spotify',
    icon: require('../assets/spotify.png'),
  },
};

export interface SourceContextProps {
  source: SourceType;
  updateSource: () => void;
}

const SourceContext = React.createContext<SourceContextProps>({
  source: initialSource,
  updateSource: () => {},
});

export function SourceProvider({children}: {children: React.ReactNode}) {
  const [source, setSource] = React.useState<SourceType>(initialSource);

  const updateSource = () => {
    setSource(initialSource);
    getIndex().then(index => {
      if (index) {
        SourceKeys.map((key: SourceKeysType) => {
          setSource((prev: SourceType) => ({
            ...prev,
            [key]: {
              ...prev[key],
              package: index[key]?.package,
              version: index[key]?.version,
              link: index[key]?.link,
            },
          }));
        });
      }
    });
  };
  return (
    <SourceContext.Provider
      value={{
        source,
        updateSource,
      }}>
      {children}
    </SourceContext.Provider>
  );
}

export function useSource(): [SourceType, () => void] {
  const context = React.useContext(SourceContext);
  if (context === undefined) {
    throw new Error('useSource must be used within a SourceProvider');
  }
  return [context.source, context.updateSource];
}
