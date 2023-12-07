import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, Icon} from '@rneui/base';
import {Theme, useTheme} from '@rneui/themed';
import {View} from 'react-native';
import React, {Suspense} from 'react';
import HomeScreen from './apps';
import {greys} from '../utils/theme';

const Tab = createBottomTabNavigator();

function TabIcon({
  focused,
  name,
  theme,
}: {
  focused: boolean;
  name: string;
  theme: Theme & {colors: Colors};
}) {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon
        size={30}
        name={name}
        type="material-community"
        color={focused ? theme.colors.primary : greys[1]}
      />
    </View>
  );
}

export default function Routes() {
  const {theme} = useTheme();
  const DynamicSpecialScreen = React.lazy(() => import('./special'));
  const DynamicToolsScreen = React.lazy(() => import('./tools'));

  return (
    <Suspense>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => null,
        }}
        initialRouteName="Apps">
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} name="star" theme={theme} />
            ),
          }}
          name="Special"
          component={DynamicSpecialScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} name="apps" theme={theme} />
            ),
          }}
          name="Apps"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} name="tools" theme={theme} />
            ),
          }}
          name="Tools"
          component={DynamicToolsScreen}
        />
      </Tab.Navigator>
    </Suspense>
  );
}
