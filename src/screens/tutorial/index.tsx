import {View, Text,ImageBackground, StyleSheet, TouchableOpacity,Image} from 'react-native';
import React, {useEffect} from 'react';
import { Images } from '../../assets';
import { useNavigation } from '@react-navigation/native';

import { firebase } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

import { ScreenNames } from '../../navigator/screenNames';
import { RootStackParamList } from '../../navigator/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type SigninScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, ScreenNames.Home>;

const Tutorial = () => {
  const navigation = useNavigation<SigninScreenNavigationProp>();
  useEffect(() => {

    AsyncStorage.setItem('hasSeenTutorial', 'true');
  }, []);
  return (
   
    <ImageBackground source={Images.tutorial} style={styles.container}>
     
    <View style={styles.head}>
      <Image source={Images.chef}></Image>
      <Text style={styles.premium}>100K+ Premium Recipe</Text>    
    </View>

    <View style={styles.mainView}>
      <Text style={styles.welcome}>Welcome at CookSpace</Text>
      <Text style={styles.tasty}>Simple way to find Tasty Recipe</Text>
      <TouchableOpacity style={styles.touch} onPress={()=>navigation.navigate(ScreenNames.Signin)}>
        <Text style={styles.start}>Start Cooking</Text>
      </TouchableOpacity>
    </View>
   
     
    </ImageBackground>
  
  );
};


export default Tutorial;
