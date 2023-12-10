import React, {version} from 'react';
import {ImageSourcePropType} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Apps from '../modules/apps';

export type SourceKeysType =
  | 'HDO'
  | 'YOUTUBE_MICROG'
  | 'YOUTUBE_YOUTUBE'
  | 'YOUTUBE_MUSIC'
  | 'SPOTIFY'
  | 'INSTAGRAM'
  | 'WHATSAPP'
  | 'CAPCUT'
  | 'PHOTO_EDITOR_PRO';

export const RoutesKeys: SourceKeysType[] = [
  'CAPCUT',
  'HDO',
  'INSTAGRAM',
  'PHOTO_EDITOR_PRO',
  'SPOTIFY',
  'WHATSAPP',
  'YOUTUBE_YOUTUBE',
  'YOUTUBE_MUSIC',
];
export const SourceKeys: SourceKeysType[] = [...RoutesKeys, 'YOUTUBE_MICROG'];

export type AppState = 'NOT_INSTALLED' | 'NOT_UPDATED' | 'UPDATED';

export interface SourceType {
  title: string;
  icon: ImageSourcePropType;
  packageName: string;
  route: string;
  url: string;
  fileName: string;
  version?: string;
  link?: string;
  state?: AppState;
}

export type SourceProps = Record<SourceKeysType, SourceType>;

export const initialSource: SourceProps = {
  HDO: {
    title: 'HDO Box',
    icon: require('../../assets/hdo.png'),
    packageName: 'com.hdobox',
    route: 'Apps-HDO',
    fileName: 'HDOBox.apk',
    url: 'https://hdo.app',
  },
  YOUTUBE_MICROG: {
    title: 'MicroG',
    icon: require('../../assets/microg.png'),
    packageName: 'com.mgoogle.android.gms',
    route: '',
    fileName: 'microg.apk',
    url: 'https://github.com/TeamVanced/VancedMicroG',
  },
  YOUTUBE_YOUTUBE: {
    title: 'YouTube',
    icon: require('../../assets/youtube.png'),
    packageName: 'app.revanced.android.youtube',
    route: 'Apps-Youtube',
    fileName: 'YouTube.apk',
    url: 'https://github.com/j-hc/revanced-magisk-module',
  },
  YOUTUBE_MUSIC: {
    title: 'YouTube Music',
    icon: require('../../assets/youtube_music.png'),
    packageName: 'app.revanced.android.apps.youtube.music',
    route: 'Apps-YoutubeMusic',
    fileName: 'YouTubeMusic.apk',
    url: 'https://github.com/j-hc/revanced-magisk-module',
  },
  SPOTIFY: {
    title: 'Spotify',
    icon: require('../../assets/spotify.png'),
    packageName: 'com.spotify.music',
    route: 'Apps-Spotify',
    fileName: 'Spotify.apk',
    url: 'https://spotigeek.com/',
  },
  INSTAGRAM: {
    title: 'Instagram',
    icon: require('../../assets/instagram.png'),
    packageName: 'com.instagram.android',
    route: 'Apps-Instagram',
    fileName: 'Instagram.apk',
    url: 'https://instander.app/',
  },
  WHATSAPP: {
    title: 'WhatsApp',
    icon: require('../../assets/whatsapp.png'),
    packageName: 'com.whatsapp',
    route: 'Apps-WhatsApp',
    fileName: 'WhatsApp.apk',
    url: 'https://gbapkpro.com/fouad-whatsapp/',
  },
  CAPCUT: {
    title: 'CapCut',
    icon: require('../../assets/capcut.png'),
    packageName: 'com.lemon.lvoverseas',
    route: 'Apps-CapCut',
    fileName: 'CapCut.apk',
    url: 'https://capcutapk.io/',
  },
  PHOTO_EDITOR_PRO: {
    title: 'Photo Editor Pro',
    icon: require('../../assets/photo_editor_pro.png'),
    packageName: 'photo.editor.photoeditor.photoeditorpro',
    route: 'Apps-PhotoEditorPro',
    fileName: 'PhotoEditorPro.apk',
    url: 'https://modyolo.com/polish-photo-editor-pro.html',
  },
};

async function getAppState(source: SourceType): Promise<AppState | undefined> {
  const version = await Apps.getAppVersion(source.packageName);
  if (!version) return 'NOT_INSTALLED';
  return version === source.version ? 'UPDATED' : 'NOT_UPDATED';
}

export interface SourceContextProps {
  source: SourceProps;
  updateSource: () => Promise<void>;
  updateState: (app: SourceType | 'ALL') => Promise<void>;
}

const SourceContext = React.createContext<SourceContextProps>({
  source: initialSource,
  updateSource: async () => {},
  updateState: async () => {},
});

export function SourceProvider({children}: {children: React.ReactNode}) {
  const [source, setSource] = React.useState<SourceProps>(initialSource);

  const updateState = async (app: SourceType | 'ALL') => {
    const newSource = {...source};
    switch (app) {
      case 'ALL':
        await Promise.all(
          SourceKeys.map(async app => {
            newSource[app] = {
              ...newSource[app],
              state: await getAppState(newSource[app]),
            };
          }),
        );
      default:
        Object.keys(source).map(key => {
          if (
            source[key as SourceKeysType].packageName ===
            (app as SourceType).packageName
          ) {
            newSource[key as SourceKeysType] = {
              ...newSource[key as SourceKeysType],
              state: (app as SourceType).state,
            };
          }
        });
    }
    setSource(_ => newSource);
  };

  const updateSource = async () => {
    let newSource: SourceProps = {...source};
    const col = firestore().collection('apps');
    const snapshot = await col.get();
    snapshot.docs.map(doc => {
      newSource[doc.id as SourceKeysType] = {
        ...newSource[doc.id as SourceKeysType],
        version: doc.data()['version'],
        link: doc.data()['link'],
      };
    });
    await Promise.all(
      SourceKeys.map(async app => {
        newSource[app] = {
          ...newSource[app],
          state: await getAppState(newSource[app]),
        };
      }),
    );
    setSource(newSource);
  };

  return (
    <SourceContext.Provider
      value={{
        source,
        updateSource,
        updateState,
      }}>
      {children}
    </SourceContext.Provider>
  );
}

export function useSource(): [
  SourceProps,
  () => Promise<void>,
  (app: SourceType | 'ALL') => Promise<void>,
] {
  const context = React.useContext(SourceContext);
  if (context === undefined) {
    throw new Error('useSource must be used within a SourceProvider');
  }
  return [context.source, context.updateSource, context.updateState];
}
