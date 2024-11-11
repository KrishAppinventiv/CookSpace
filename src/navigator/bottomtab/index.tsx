import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/home';
import {ScreenNames} from '../screenNames';
import Profile from '../../screens/profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        component={Home}
        name={ScreenNames.Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        component={Profile}
        name={ScreenNames.Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
