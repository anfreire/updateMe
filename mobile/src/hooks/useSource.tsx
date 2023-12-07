import React from 'react';
import {ImageSourcePropType} from 'react-native';

export type SourceKeysType =
  | 'HDO'
  | 'YOUTUBE_MICROG'
  | 'YOUTUBE_YOUTUBE'
  | 'YOUTUBE_MUSIC'
  | 'SPOTIFY';

export const RoutesKeys: SourceKeysType[] = [
  'YOUTUBE_YOUTUBE',
  'HDO',
  'YOUTUBE_MUSIC',
  'SPOTIFY',
];
export const SourceKeys: SourceKeysType[] = [...RoutesKeys, 'YOUTUBE_MICROG'];

export interface SourceType {
  title: string;
  icon: ImageSourcePropType;
  packageName: string;
  route: string;
  version?: string;
  link?: string;
}

export type SourceProps = Record<SourceKeysType, SourceType>;

export const initialSource: SourceProps = {
  HDO: {
    title: 'HDO',
    icon: require('../../assets/hdo.png'),
    packageName: 'com.hdobox',
    route: 'Apps-HDO',
  },
  YOUTUBE_MICROG: {
    title: 'MicroG',
    icon: require('../../assets/microg.png'),
    packageName: 'com.mgoogle.android.gms',
    route: '',
  },
  YOUTUBE_YOUTUBE: {
    title: 'YouTube',
    icon: require('../../assets/youtube.png'),
    packageName: 'app.revanced.android.youtube',
    route: 'Apps-Youtube',
  },
  YOUTUBE_MUSIC: {
    title: 'YouTube Music',
    icon: require('../../assets/youtube_music.png'),
    packageName: 'app.revanced.android.apps.youtube.music',
    route: 'Apps-YoutubeMusic',
  },
  SPOTIFY: {
    title: 'Spotify',
    icon: require('../../assets/spotify.png'),
    packageName: 'com.spotify.music',
    route: 'Apps-Spotify',
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
