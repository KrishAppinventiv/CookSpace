import {View, Text,ImageBackground, StyleSheet, TouchableOpacity,Image} from 'react-native';
import React, {useEffect} from 'react';
import { Images } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../navigator/screenNames';
import { firebase } from '../../firebaseConfig';




const Tutorial = () => {

  const navigation = useNavigation();
  
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

const styles = StyleSheet.create({
  start: {
    fontSize:16,
    color:'white',
    fontWeight:'700',
  },
  touch: {
    backgroundColor:'#129575',
    padding:20,
    borderRadius:30,
    paddingHorizontal:40,
    marginTop:20,
  },
  tasty: {
    color:'white',
    fontSize:15,
    fontWeight:'400',
    marginTop:10,
  },
  welcome: {
    color:'white',
    fontSize:24,
    fontWeight:'700',
    fontFamily:'Georgia',
  },
  mainView: {
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    marginBottom:100,
  },
  premium: {
    fontSize:19,
    color:'white',
    fontWeight:'800',
  },
  head: {
    marginTop:100,
    alignItems:'center',
    justifyContent:'flex-end',
  },

  container:{
    flex: 1,
    
  }

})
export default Tutorial;
