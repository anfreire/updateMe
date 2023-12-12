import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {Suspense} from 'react';
import AppsMain from './screens/index';
import DownloadDialog from './components/downloadDialog';

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
  const DynamicSpotifyScreen = React.lazy(() => import('./screens/spotify'));
  const DynamicYoutubeScreen = React.lazy(() => import('./screens/youtube'));
  const DynamicYoutubeMusicScreen = React.lazy(
    () => import('./screens/youtubeMusic'),
  );
  const DynamicHDOScreen = React.lazy(() => import('./screens/hdo'));
  const DynamicWhatsAppScreen = React.lazy(() => import('./screens/whatsapp'));
  const DynamicInstagramScreen = React.lazy(
    () => import('./screens/instagram'),
  );
  const DynamicCapCutScreen = React.lazy(() => import('./screens/capcut'));
  const DynamicPhotoEditorProScreen = React.lazy(
    () => import('./screens/photoEditorPro'),
  );
  const DynamicInshotScreen = React.lazy(() => import('./screens/inshot'));
  const DynamicPhotoshopExpressScreen = React.lazy(
    () => import('./screens/photoshopExpress'),
  );

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
          component={DynamicYoutubeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Youtube Music',
          }}
          name="Apps-YoutubeMusic"
          component={DynamicYoutubeMusicScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Spotify',
          }}
          name="Apps-Spotify"
          component={DynamicSpotifyScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'HDO Box',
          }}
          name="Apps-HDO"
          component={DynamicHDOScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Instagram',
          }}
          name="Apps-Instagram"
          component={DynamicInstagramScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'WhatsApp',
          }}
          name="Apps-WhatsApp"
          component={DynamicWhatsAppScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'CapCut',
          }}
          name="Apps-CapCut"
          component={DynamicCapCutScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Photo Editor Pro',
          }}
          name="Apps-PhotoEditorPro"
          component={DynamicPhotoEditorProScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Inshot',
          }}
          name="Apps-InShot"
          component={DynamicInshotScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Photoshop Express',
          }}
          name="Apps-PhotoshopExpress"
          component={DynamicPhotoshopExpressScreen}
        />
      </Stack.Navigator>
    </Suspense>
  );
}
