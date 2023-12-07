import React from 'react';
import {ImageSourcePropType} from 'react-native';

export type SourceKeysType =
  | 'HDO'
  | 'YOUTUBE_MICROG'
  | 'YOUTUBE_YOUTUBE'
  | 'YOUTUBE_MUSIC'
  | 'SPOTIFY';

export const SourceKeys: SourceKeysType[] = [
  'HDO',
  'YOUTUBE_YOUTUBE',
  'YOUTUBE_MICROG',
  'YOUTUBE_MUSIC',
  'SPOTIFY',
];

export interface SourceType {
  title: string;
  icon: ImageSourcePropType;
  packageName: string;
  version?: string;
  link?: string;
}

export type SourceProps = Record<SourceKeysType, SourceType>;

export const initialSource: SourceProps = {
  HDO: {
    title: 'HDO',
    icon: require('../assets/hdo.png'),
    packageName: 'com.hdobox',
  },
  YOUTUBE_MICROG: {
    title: 'MicroG',
    icon: require('../assets/microg.png'),
    packageName: 'com.google.android.gms',
  },
  YOUTUBE_YOUTUBE: {
    title: 'YouTube',
    icon: require('../assets/youtube.png'),
    packageName: 'app.revanced.android.youtube',
  },
  YOUTUBE_MUSIC: {
    title: 'YouTube Music',
    icon: require('../assets/youtube_music.png'),
    packageName: 'app.revanced.android.apps.youtube.music',
  },
  SPOTIFY: {
    title: 'Spotify',
    icon: require('../assets/spotify.png'),
    packageName: 'com.spotify.music',
  },
};

export interface SourceContextProps {
  source: SourceProps;
  update: () => Promise<void>;
}

const SourceContext = React.createContext<SourceContextProps>({
  source: initialSource,
  update: async () => {},
});

export function SourceProvider({children}: {children: React.ReactNode}) {
  const [source, setSource] = React.useState<SourceProps>(initialSource);

  const update = async () => {
    setSource(initialSource);
    try {
      const response = await fetch(
        'https://github.com/anfreire/updateMe/raw/gh-pages/scripts/index.json',
      );
      const newSource = await response.json();
      SourceKeys.map((key: SourceKeysType) => {
        setSource((prev: SourceProps) => ({
          ...prev,
          [key]: {
            ...prev[key],
            version: newSource[key]?.version,
            link: newSource[key]?.link,
          },
        }));
      });
    } catch (_) {
      return;
    }
  };

  return (
    <SourceContext.Provider
      value={{
        source,
        update,
      }}>
      {children}
    </SourceContext.Provider>
  );
}

export function useSource(): [SourceProps, () => void] {
  const context = React.useContext(SourceContext);
  if (context === undefined) {
    throw new Error('useSource must be used within a SourceProvider');
  }
  return [context.source, context.update];
}
