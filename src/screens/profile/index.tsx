import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../theme/dimensions';
import { colors } from '../../theme';

const Profile = () => {
  const navigation: any = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = () => {
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'flex-end', marginEnd: 20}}>
        <Image source={Images.more} style={styles.back} />
      </View>

      <View style={styles.head}>
        <Text style={styles.heading}>Profile</Text>
      </View>

      <View style={{flexDirection: 'row', marginHorizontal: vw(10)}}>
        <Image source={Images.dp} style={{width: vw(99), height: vh(99)}} />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: vh(20),
            marginHorizontal: vw(25),
          }}>
          <View>
            <Text style={{color: '#A9A9A9'}}>Recipe</Text>
            <Text style={{textAlign: 'center', marginTop: vh(10),fontSize:vh(20),fontWeight:'600'}}>4</Text>
          </View>
          <View>
            <Text style={{color: '#A9A9A9'}}>Followers</Text>
            <Text style={{textAlign: 'center', marginTop: vh(10),fontSize:vh(20),fontWeight:'600'}}>2.5M</Text>
          </View>
          <View>
            <Text style={{color: '#A9A9A9'}}>Following</Text>
            <Text style={{textAlign: 'center', marginTop: vh(10),fontSize:vh(20),fontWeight:'600'}}>259</Text>
          </View>
        </View>
      </View>

      <View style={{marginHorizontal: vw(25),marginTop:vh(5)}}>
        <Text style={{color:'#121212',fontWeight:'600',fontSize:vh(20),fontFamily:'Poppins'}}>Krishna</Text>
        <Text style={{color:'#A9A9A9',lineHeight:vh(16.5),}}>Chef</Text>
        <Text style={{color:'#A9A9A9',marginTop:vh(12),lineHeight:vh(18.5),fontSize:vh(13)}}>Private Chef</Text>
        <Text style={{color:'#A9A9A9',lineHeight:vh(18.5),fontSize:vh(13)}}>Passionate about food and life 🥘🍲🍝🍱</Text>
        <Text style={{color:'#71B1A1',lineHeight:vh(18.5),fontSize:vh(13)}}>More..</Text>
      </View>

      <FlatList
        data={['Recipe', 'Images', 'Tag']}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.typeItem}
              onPress={() => {
                setSelectedTab(index);
               
              }}>
              <View
                style={[
                  styles.category,
                  {
                    backgroundColor:
                      selectedTab == index ? colors.main : colors.white,
                  },
                ]}>
                <Text
                  style={{
                    color: selectedTab == index ? 'white' : '#71B1A1',
                    fontWeight: '800',
                    fontSize: selectedTab == index ? 14 : 16,
                  }}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: vh(23),
    fontWeight: '600',
    alignSelf: 'center',
  },
  head: {
    justifyContent: 'center',

    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    height: vh(20),
    width: vw(20),
    marginStart: vw(10),
  },
  typeItem: {
    marginHorizontal: vw(12),
    marginTop: vh(25),
    paddingBottom: vh(10),
  },
  category: {
    backgroundColor: colors.white,
     width:vw(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: vh(20),
    paddingVertical: vw(10),
  },
});
