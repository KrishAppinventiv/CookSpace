import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {contains} from 'validator';
import {Images} from '../../assets';
import { colors } from '../../theme';

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const url = route.params.data.recipe;
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '38%'}}>
        <Image
          source={{uri: url.image}}
          style={styles.banner}
          resizeMode="cover"
        />
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,.5)',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 25,
                position: 'absolute',
                backgroundColor: 'white',
                top: 45,
                left: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={Images.left} style={{height: 32, width: 32}} />
            </View>
          </TouchableOpacity>
          <View style={{bottom: 7, position: 'absolute', right: 10,flexDirection:'row',marginBottom:20}}>
            <View style={{flexDirection:'row',marginTop:5}}>
            <Image
              source={Images.timer} tintColor='white'
              style={{height: 22, width: 22, marginRight: 5}}
            />
            <Text style={{color:'white',fontSize:17,marginRight:10}}>20 min</Text>
            </View>

            <View style={{height:33,width:33,backgroundColor:'white',justifyContent:'center',borderRadius:18}}>
            <Image
              source={Images.active}
              style={{height: 23, width: 23,alignSelf:'center'}}
            />
            </View>
          </View>
        </View>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:20,marginTop:20}}>
       <Text style={{fontSize:22,fontWeight:'600',color:'black',width:'60%'}}>
        {url.label}
       </Text>
       <Text style={{fontSize:18,fontWeight:'600',color:'#A9A9A9',fontFamily:'Poppins'}}>(13k Reviews)</Text>
      </View>

      <View style={{justifyContent:'space-between',flexDirection:"row",marginTop:20,marginHorizontal:20}}>

        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          
              <Image source={Images.chefpic} resizeMode='cover' style={{height:40,width:40,borderRadius:25}}/>
            
            <View style={{marginLeft:10}}>
                <Text style={{fontSize:18,fontWeight:'600'}}>{url.source}</Text>
                <View style={{flexDirection:'row',marginTop:5}}>
                  <Image source={Images.location} style={{height:29,width:29,marginRight:6}}/>
                  <Text style={{fontSize:16,fontWeight:'600',color:'#A9A9A9'}}>Lagos,Nigeria</Text>
                </View>
               
            </View>
        </View>

        <View style={{paddingHorizontal:30,backgroundColor:colors.main,justifyContent:'center',alignItems:'center',borderRadius:10,opacity:.9}}>
         <Text style={{color:'white',fontSize:17,fontWeight:'700'}}>Follow</Text>
        </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
});
