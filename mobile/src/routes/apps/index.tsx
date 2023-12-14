import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {Suspense} from 'react';
import AppsMain from './screens/index';
import DownloadDialog from './components/downloadDialog';
import AppsYoutube from './screens/youtube';
import AppsYoutubeMusic from './screens/youtubeMusic';
import AppsSpotify from './screens/spotify';
import AppsHDO from './screens/hdo';
import AppsInstagram from './screens/instagram';
import AppsWhatsapp from './screens/whatsapp';
import AppsCapcut from './screens/capcut';
import AppsPhotoEditorPro from './screens/photoEditorPro';
import AppsInshot from './screens/inshot';
import AppsPhotoshopExpress from './screens/photoshopExpress';
import AppsTwitter from './screens/twitter';

const Stack = createNativeStackNavigator();

const Screens = [
  'Apps-Main',
  'Apps-Youtube',
  'Apps-YoutubeMusic',
  'Apps-Spotify',
  'Apps-HDO',
  'Apps-Instagram',
  'Apps-WhatsApp',
  'Apps-CapCut',
  'Apps-PhotoEditorPro',
  'Apps-InShot',
  'Apps-PhotoshopExpress',
  'Apps-Twitter',
] as const;

export namespace HomeScreenTypes {
  export type ScreensType = (typeof Screens)[number];

  export type RootStackParamList = Record<ScreensType, undefined>;

  export type StackScreenProps<T extends ScreensType> = NativeStackScreenProps<
    RootStackParamList,
    T
  >;
}

export default function HomeScreen() {
  return (
    <Suspense>
      <DownloadDialog />
      <Stack.Navigator
        initialRouteName="Apps-Main"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Apps-Main" component={AppsMain as any} />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Youtube',
          }}
          name="Apps-Youtube"
          component={AppsYoutube}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Youtube Music',
          }}
          name="Apps-YoutubeMusic"
          component={AppsYoutubeMusic}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Spotify',
          }}
          name="Apps-Spotify"
          component={AppsSpotify}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'HDO Box',
          }}
          name="Apps-HDO"
          component={AppsHDO}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Instagram',
          }}
          name="Apps-Instagram"
          component={AppsInstagram}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'WhatsApp',
          }}
          name="Apps-WhatsApp"
          component={AppsWhatsapp}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'CapCut',
          }}
          name="Apps-CapCut"
          component={AppsCapcut}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Photo Editor Pro',
          }}
          name="Apps-PhotoEditorPro"
          component={AppsPhotoEditorPro}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Inshot',
          }}
          name="Apps-InShot"
          component={AppsInshot}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Photoshop Express',
          }}
          name="Apps-PhotoshopExpress"
          component={AppsPhotoshopExpress}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Twitter',
          }}
          name="Apps-Twitter"
          component={AppsTwitter}
        />
      </Stack.Navigator>
    </Suspense>
  );
}
