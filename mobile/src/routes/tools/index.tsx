import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {Suspense} from 'react';
import ToolsMain from './main';
import {Button, Icon, Text} from '@rneui/themed';
import Files from '../../../modules/files';
import {deleteAllFiles} from '../../../utils/apps';
import {colors} from '../../../utils/theme';
import {TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator();

const Screens = [
  'Tools-Main',
  'Tools-Downloads',
  'Tools-Accent',
  'Tools-Report',
  'Tools-Help',
] as const;

export namespace ToolsScreenTypes {
  export type ScreensType = (typeof Screens)[number];

  export type RootStackParamList = Record<ScreensType, undefined>;

  export type StackScreenProps<T extends ScreensType> = NativeStackScreenProps<
    RootStackParamList,
    T
  >;
}

export default function ToolsScreen() {
  const [hasFiles, setHasFiles] = React.useState(false);
  const DynamicDownloads = React.lazy(() => import('./downloads'));
  const DynamicAccent = React.lazy(() => import('./accent'));
  const DynamicReport = React.lazy(() => import('./report'));
  const DynamicHelp = React.lazy(() => import('./help'));
  return (
    <Suspense>
      <Stack.Navigator
        initialRouteName="Tools-Main"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tools-Main" component={ToolsMain as any} />
        <Stack.Screen
          options={{
            headerTitle: 'Change accent color',
            headerShown: true,
          }}
          name="Tools-Accent"
          component={DynamicAccent}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Downloads',
            headerShown: true,
            headerRight: undefined,
          }}
          name="Tools-Downloads"
          component={DynamicDownloads}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Report a problem',
            headerShown: true,
          }}
          name="Tools-Report"
          component={DynamicReport}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Help',
            headerShown: true,
          }}
          name="Tools-Help"
          component={DynamicHelp}
        />
      </Stack.Navigator>
    </Suspense>
  );
}
