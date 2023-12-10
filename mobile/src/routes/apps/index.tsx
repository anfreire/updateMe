import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {Suspense, useEffect} from 'react';
import HomeMain from './screens/index';
import {useTheme} from '@rneui/themed';
import AppsMain from './screens/index';
import useAccentColor from '../../hooks/useAccentColor';

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
  const theme = useTheme();
  const accentColor = useAccentColor(theme)[0];
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
  useEffect(() => {
    accentColor().then(accent => {
      if (accent) {
        theme.updateTheme({
          lightColors: {
            primary: accent.light,
          },
          darkColors: {
            primary: accent.dark,
          },
        });
      }
    });
  }, []);

  return (
    <Suspense>
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
      </Stack.Navigator>
    </Suspense>
  );
}
