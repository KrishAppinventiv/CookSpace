import {View, Text, Animated, Image, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Images} from '../../assets';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../navigator/screenNames';
import Splash from 'react-native-splash-screen';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
const SplashScreen = () => {

  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation: any = useNavigation();
  const viewAnimate = () =>
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();

  const navigateTo = (screenNames: any, params?: any) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenNames, params}],
      }),
    );
  };

  useEffect(() => {
    Splash.hide();
    
   
    viewAnimate();
    setTimeout(() => {
      if (true) {
        // navigation.navigate(ScreenNames.BottomTab);
        // navigateTo(ScreenNames.Tutorial);
        // navigateTo(ScreenNames.BottomTab, {screen: ScreenNames.Profile});
        const checkAuthStatus = async () => {
          const user = getAuth().currentUser; 
          if (user) {
            
            console.log('User UID:', user.uid);
            
          
            const userDoc = await getFirestore().collection('users').doc(user.uid).get();
           
              navigation.replace(ScreenNames.BottomTab);  
            
          } else {
          
            navigation.replace(ScreenNames.Signin);
          }
        };

        checkAuthStatus();
      }
    }, 1000);


  }, []);


  // useEffect(() => {
  //   const checkAuthStatus = async () => {
  //     const user = getAuth().currentUser; 
  //     if (user) {
        
  //       console.log('User UID:', user.uid);
        
      
  //       const userDoc = await getFirestore().collection('users').doc(user.uid).get();
       
  //         navigation.replace(ScreenNames.BottomTab);  
        
  //     } else {
      
  //       navigation.replace(ScreenNames.Signin);
  //     }
  //   };

  //   checkAuthStatus();
  // }, [navigation]);
  return (
    <Animated.View
      style={[styles.containers, {opacity: fadeAnim}]}
      testID="splash">


       <ImageBackground source={Images.cooking} style={styles.container}>
     
    
   
     
        </ImageBackground>
     </Animated.View>
  );
};

export default SplashScreen;
