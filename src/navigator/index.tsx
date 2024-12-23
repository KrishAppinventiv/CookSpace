import {ScreenNames} from './screenNames';
import BottomTabNavigator from './bottomtab';
import SplashScreen from '../screens/splashScreen';

import Home from '../screens/home';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tutorial from '../screens/tutorial';
import Signin from '../screens/signin';
import Signup from '../screens/signup';
import Details from '../screens/details';
import Search from '../screens/search';
import Categories from '../screens/categories';

const Stack: any = createNativeStackNavigator();

const RootNavigator = () => {
  const navigationRef: any = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        <Stack.Screen
          component={SplashScreen}
          name={ScreenNames.Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={BottomTabNavigator}
          name={ScreenNames.BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Signin}
          name={ScreenNames.Signin}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Tutorial}
          name={ScreenNames.Tutorial}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Signup}
          name={ScreenNames.Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Details}
          name={ScreenNames.Details}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Search}
          name={ScreenNames.Search}
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={Categories}
          name={ScreenNames.Category}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
