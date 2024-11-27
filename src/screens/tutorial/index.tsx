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
     
    <View style={{marginTop:100, alignItems:'center',justifyContent:'flex-end'}}>
     
      <Image source={Images.chef}></Image>
      <Text style={{fontSize:19,color:'white',fontWeight:'800'}}>100K+ Premium Recipe</Text>
    
      
       
    </View>

    <View style={{ flex:1,justifyContent:'flex-end',alignItems:'center',marginBottom:100}}>
      <Text style={{color:'white',fontSize:24,fontWeight:'700',fontFamily:'Georgia'}}>Welcome at CookSpace</Text>
      <Text style={{color:'white',fontSize:15,fontWeight:'400',marginTop:10}}>Simple way to find Tasty Recipe</Text>
      <TouchableOpacity style={{backgroundColor:'#129575',padding:20,borderRadius:30,paddingHorizontal:40,marginTop:20}} onPress={()=>navigation.navigate(ScreenNames.Signin)}>
        <Text style={{fontSize:16,color:'white',fontWeight:'700'}}>Start Cooking</Text>
      </TouchableOpacity>
    </View>
   
     
    </ImageBackground>
  
  );
};

const styles = StyleSheet.create({

  container:{
    flex: 1,
    
  }

})
export default Tutorial;
