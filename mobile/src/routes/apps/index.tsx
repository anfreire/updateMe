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
            headerTitle: 'HDO',
          }}
          name="Apps-HDO"
          component={DynamicHDOScreen}
        />
      </Stack.Navigator>
    </Suspense>
  );
}
