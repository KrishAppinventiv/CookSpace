import {View, Text, Animated, Image, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Images} from '../../assets';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../navigator/screenNames';
import Splash from 'react-native-splash-screen';
import {getAuth} from '@react-native-firebase/auth';

import {getFirestore} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation: any = useNavigation();
  const viewAnimate = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();

  useEffect(() => {
    Splash.hide();
    viewAnimate();
    setTimeout(() => {
      if (true) {
        const checkAuthStatus = async () => {

          const user = getAuth().currentUser;
          const hasSeenTutorial = await AsyncStorage.getItem('hasSeenTutorial');
          if (user) {
            console.log('User UID:', user.uid);
            navigation.replace(ScreenNames.BottomTab);
          } else {
            if (hasSeenTutorial === 'true') {
            
              navigation.replace(ScreenNames.Signin);
            } else {
             
              navigation.replace(ScreenNames.Tutorial);
            }
          }
        };

        checkAuthStatus();
      }
    }, 1000);
  }, []);

  return (
    <Animated.View
      style={[styles.containers, {opacity: fadeAnim}]}
      testID="splash">
      <ImageBackground
        source={Images.cooking}
        style={styles.container}></ImageBackground>
    </Animated.View>
  );
};

export default SplashScreen;
