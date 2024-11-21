import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/home';
import {ScreenNames} from '../screenNames';
import Profile from '../../screens/profile';
import Save from '../../screens/save';
import Add from '../../screens/add';
import Notification from '../../screens/notification';
import {Image, TouchableOpacity, View} from 'react-native';
import {Images} from '../../assets';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          shadowColor: 'rgba(0,0,0,.1)',
          shadowOpacity: 6,
        },
      }}>
      <Tab.Screen
        component={Home}
        name={ScreenNames.Home}
        options={{
          tabBarIcon: ({focused}) => (
            
            <View style={{marginTop: 10}}>
              <Image source={focused?Images.vector:Images.home} style={{height: 28, width: 28}} resizeMode='contain'/>
            </View>
           
          ),
        }}
      />
      <Tab.Screen
        component={Save}
        name={ScreenNames.Save}
        options={{
          tabBarIcon: ({focused}) => (
           
            <View style={{marginTop: 10}}>
              <Image source={focused? Images.saveActive:Images.save} style={{height: 28, width: 28}} resizeMode='contain'/>
            </View>
           
          ),
        }}
      />
      <Tab.Screen
        component={Add}
        name={ScreenNames.Add}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity activeOpacity={.6}>
            <View style={{marginBottom:20}}>
              <Image
                source={Images.navBar}
                style={{height:65,aspectRatio: 1}}
                resizeMode='contain'
              />
            </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        component={Notification}
        name={ScreenNames.Notify}
        options={{
          tabBarIcon: ({focused}) => (
            
            <View style={{marginTop: 10}}>
              <Image
                source={focused?Images.notify:Images.notification}
                style={{height: 28, width: 28}}
                resizeMode='contain'
              />
            </View>
            
          ),
        }}
      />
      <Tab.Screen
        component={Profile}
        name={ScreenNames.Profile}
        options={{
          
          tabBarIcon: ({focused}) => (
            
            <View style={{marginTop: 10}}>
              <Image source={focused?Images.profileActive:Images.profile} style={{height: 28, width: 28}} resizeMode='contain'/>
            </View>
           
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
