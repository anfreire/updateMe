import {NavigationContainer} from '@react-navigation/native';
import Home from './home';

import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {Icon} from 'react-native-paper';
import {View} from 'react-native';
import Special from './special';
import Tools from './tools';
const Tab = createMaterialBottomTabNavigator();

interface BarIconProps {
  focused: boolean;
  color: string;
  name: string;
  source: string;
}
const BarIcon = ({focused, color, name, source}: BarIconProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon size={30} source={source} color={color} />
    </View>
  );
};

export default function Pages() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="history"
        activeColor="#ffffff"
        inactiveColor="#ffffff21"
        labeled={false}
        barStyle={{
          backgroundColor: '#000000',
          height: 50,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: props => (
              <BarIcon name="Special" {...props} source="star-four-points" />
            ),
          }}
          name="Special"
          component={Special}
        />
        <Tab.Screen
          options={{
            tabBarIcon: props => (
              <BarIcon name="Home" {...props} source="home" />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon: props => (
              <BarIcon name="Tools" {...props} source="tools" />
            ),
          }}
          name="Tools"
          component={Tools}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
