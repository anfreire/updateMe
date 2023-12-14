import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {Suspense} from 'react';
import ToolsMain from './screens';
import ToolsDownloads from './screens/downloads';
import ToolsAccentColor from './screens/accent';
import ToolsReport from './screens/report';

const Stack = createNativeStackNavigator();

const Screens = [
  'Tools-Main',
  'Tools-Downloads',
  'Tools-Accent',
  'Tools-Report',
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
          component={ToolsAccentColor}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Downloads',
            headerShown: true,
            headerRight: undefined,
          }}
          name="Tools-Downloads"
          component={ToolsDownloads}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Report a problem',
            headerShown: true,
          }}
          name="Tools-Report"
          component={ToolsReport}
        />
      </Stack.Navigator>
    </Suspense>
  );
}
