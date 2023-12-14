import React from 'react';
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
  | 'PHOTO_EDITOR_PRO'
  | 'PHOTOSHOP_EXPRESS'
  | 'INSHOT'
  | 'TWITTER';

export const RoutesKeys: SourceKeysType[] = [
  'CAPCUT',
  'HDO',
  'INSTAGRAM',
  'PHOTO_EDITOR_PRO',
  'SPOTIFY',
  'WHATSAPP',
  'YOUTUBE_YOUTUBE',
  'YOUTUBE_MUSIC',
  'PHOTOSHOP_EXPRESS',
  'INSHOT',
  'TWITTER',
];

export const SourceKeys: SourceKeysType[] = [...RoutesKeys, 'YOUTUBE_MICROG'];

export type AppState = 'NOT_INSTALLED' | 'NOT_UPDATED' | 'UPDATED';

export interface SourceType {
  title: string;
  icon: ImageSourcePropType;
  warnings: string[];
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
    warnings: [],
    packageName: 'com.hdobox',
    route: 'Apps-HDO',
    fileName: 'HDOBox.apk',
    url: 'https://hdo.app',
  },
  YOUTUBE_MICROG: {
    title: 'MicroG',
    icon: require('../../assets/microg.png'),
    warnings: [],
    packageName: 'com.mgoogle.android.gms',
    route: '',
    fileName: 'microg.apk',
    url: 'https://github.com/TeamVanced/VancedMicroG',
  },
  YOUTUBE_YOUTUBE: {
    title: 'YouTube',
    icon: require('../../assets/youtube.png'),
    warnings: ['This app requires MicroG to be installed to work properly.'],
    packageName: 'app.revanced.android.youtube',
    route: 'Apps-Youtube',
    fileName: 'YouTube.apk',
    url: 'https://github.com/j-hc/revanced-magisk-module',
  },
  YOUTUBE_MUSIC: {
    title: 'YouTube Music',
    icon: require('../../assets/youtube_music.png'),
    warnings: ['This app requires MicroG to be installed to work properly.'],
    packageName: 'app.revanced.android.apps.youtube.music',
    route: 'Apps-YoutubeMusic',
    fileName: 'YouTubeMusic.apk',
    url: 'https://github.com/j-hc/revanced-magisk-module',
  },
  SPOTIFY: {
    title: 'Spotify',
    icon: require('../../assets/spotify.png'),
    warnings: [
      'This app will not work if you have the official Spotify app installed.',
      "If you have the official Spotify app installed, you'll need to uninstall it first.",
      "Social media authentication (Facebook, Google) won't work.",
      'You only can authenticate with your Spotify account.',
    ],
    packageName: 'com.spotify.music',
    route: 'Apps-Spotify',
    fileName: 'Spotify.apk',
    url: 'https://spotigeek.com/',
  },
  INSTAGRAM: {
    title: 'Instagram',
    icon: require('../../assets/instagram.png'),
    warnings: [
      'Social media authentication (Facebook, Google) may not work.',
      'You do not need to uninstall the official Instagram app to use this app. It will be installed as a separate app.',
    ],
    packageName: 'com.aeroinsta.android',
    route: 'Apps-Instagram',
    fileName: 'Instagram.apk',
    url: 'https://aeroinsta.com/',
  },
  WHATSAPP: {
    title: 'WhatsApp',
    warnings: [
      'Google drive backup will not work.',
      'You do not need to uninstall the official WhatsApp app to use this app. It will be installed as a separate app.',
      'It\'s recommended to keep the original WhatsApp app installed, to be able to access your old chats.',
    ],
    icon: require('../../assets/whatsapp.png'),
    packageName: 'com.aero',
    route: 'Apps-WhatsApp',
    fileName: 'WhatsApp.apk',
    url: 'https://whatsaero.com/',
  },
  CAPCUT: {
    title: 'CapCut',
    icon: require('../../assets/capcut.png'),
    warnings: [
      'This app will not work if you have the official CapCut app installed.',
      "If you have the official CapCut app installed, you'll need to uninstall it first.",
      'Social media authentication (Facebook, Google) may not work.',
    ],
    packageName: 'com.lemon.lvoverseas',
    route: 'Apps-CapCut',
    fileName: 'CapCut.apk',
    url: 'https://capcutapk.io/',
  },
  PHOTO_EDITOR_PRO: {
    title: 'Photo Editor Pro',
    icon: require('../../assets/photo_editor_pro.png'),
    warnings: [
      'This app will not work if you have the official Photo Editor Pro app installed.',
      "If you have the official Photo Editor Pro app installed, you'll need to uninstall it first.",
    ],
    packageName: 'photo.editor.photoeditor.photoeditorpro',
    route: 'Apps-PhotoEditorPro',
    fileName: 'PhotoEditorPro.apk',
    url: 'https://modyolo.com/polish-photo-editor-pro.html',
  },
  PHOTOSHOP_EXPRESS: {
    title: 'Photoshop Express',
    icon: require('../../assets/photoshop_express.png'),
    warnings: [
      'This app will not work if you have the official Photoshop Express app installed.',
      "If you have the official Photoshop Express app installed, you'll need to uninstall it first.",
      'Adobe ID authentication may not work.',
    ],
    packageName: 'com.adobe.psmobile',
    route: 'Apps-PhotoshopExpress',
    fileName: 'PhotoshopExpress.apk',
    url: 'https://modyolo.com/photoshop-express-photo-editor.html',
  },
  INSHOT: {
    title: 'InShot',
    icon: require('../../assets/inshot.png'),
    warnings: [
      'This app will not work if you have the official InShot app installed.',
      "If you have the official InShot app installed, you'll need to uninstall it first.",
    ],
    packageName: 'com.camerasideas.instashot',
    route: 'Apps-InShot',
    fileName: 'InShot.apk',
    url: 'https://inshotpro.app/pro-mod',
  },
  TWITTER: {
    title: 'Twitter',
    icon: require('../../assets/twitter.png'),
    warnings: [
      'Social media authentication (Facebook, Google) may not work.',
      'You do not need to uninstall the official Twitter app to use this app. It will be installed as a separate app.',
    ],
    packageName: 'com.twitter.aeromod',
    route: 'Apps-Twitter',
    fileName: 'Twitter.apk',
    url: 'https://aerowitter.com/',
  },
};

async function getAppState(source: SourceType): Promise<AppState> {
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
