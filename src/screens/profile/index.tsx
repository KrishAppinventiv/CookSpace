import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';
import { useSelector } from 'react-redux';
import { ScreenNames } from '../../navigator/screenNames';

const Profile = () => {
  const navigation: any = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Recipe');


    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const favoriteItems = useSelector(state => state.favorites.items);
    console.log("favourite----->>>",favoriteItems)
 

  
    const renderItem = ({item}) => 
    
      (
        <TouchableOpacity activeOpacity={.8} onPress={() => {
          navigation.navigate(ScreenNames.Details, {
            data: item,
          });
        }}>
      <View style={styles.card}>
        <Image source={{uri: item.recipe.image}} style={styles.recipeImage} />
  
      
        <View style={styles.transparentView}>
  
        <View style={styles.review}>
          <Image source={Images.star} style={{height: 15, width: 15}} />
          <Text style={styles.point}>4.2</Text>
        </View>
          <Text style={styles.recipeTitle}>{item.recipe.label}</Text>
          <Text style={styles.recipeSource}>{item.recipe.source}</Text>
         
        </View>
  
        
      </View>
      </TouchableOpacity>
    );
    

    useEffect(() => {
    //  setLoading(false);
     setRecipes(favoriteItems)
     setLoading(false);
    
    }, [favoriteItems]);

    // useEffect(() => {
    //    setLoading(false);
       
  
    //   }, [recipes]);
  
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
            <Text
              style={{
                textAlign: 'center',
                marginTop: vh(10),
                fontSize: vh(20),
                fontWeight: '600',
              }}>
              4
            </Text>
          </View>
          <View>
            <Text style={{color: '#A9A9A9'}}>Followers</Text>
            <Text
              style={{
                textAlign: 'center',
                marginTop: vh(10),
                fontSize: vh(20),
                fontWeight: '600',
              }}>
              2.5M
            </Text>
          </View>
          <View>
            <Text style={{color: '#A9A9A9'}}>Following</Text>
            <Text
              style={{
                textAlign: 'center',
                marginTop: vh(10),
                fontSize: vh(20),
                fontWeight: '600',
              }}>
              259
            </Text>
          </View>
        </View>
      </View>

      <View style={{marginHorizontal: vw(25), marginTop: vh(5)}}>
        <Text
          style={{
            color: '#121212',
            fontWeight: '600',
            fontSize: vh(20),
            fontFamily: 'Poppins',
          }}>
          Krishna
        </Text>
        <Text style={{color: '#A9A9A9', lineHeight: vh(16.5)}}>Chef</Text>
        <Text
          style={{
            color: '#A9A9A9',
            marginTop: vh(12),
            lineHeight: vh(18.5),
            fontSize: vh(13),
          }}>
          Private Chef
        </Text>
        <Text
          style={{color: '#A9A9A9', lineHeight: vh(18.5), fontSize: vh(13)}}>
          Passionate about food and life 🥘🍲🍝🍱
        </Text>
        <Text
          style={{color: '#71B1A1', lineHeight: vh(18.5), fontSize: vh(13)}}>
          More..
        </Text>
      </View>

      

      <View
        style={[
          styles.category,
      
        ]}>
         <TouchableOpacity style={[styles.selected,{
                    backgroundColor:
                      selectedTab == 'Recipe' ? colors.main : colors.white,
                  }]} onPress={()=>{
          setSelectedTab('Recipe')
         }}>
          <Text
           style={{
            color: selectedTab == 'Recipe' ? 'white' : '#71B1A1',
            fontWeight: '800',
            fontSize: selectedTab == 'Recipe' ? 14 : 16,
          }}>Recipe</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.selected,{
                    backgroundColor:
                      selectedTab == 'Video' ? colors.main : colors.white,
                  }]}  onPress={()=>{
          setSelectedTab('Video')
         }}>
          <Text style={{
            color: selectedTab == 'Video' ? 'white' : '#71B1A1',
            fontWeight: '800',
            fontSize: selectedTab == 'Video' ? 14 : 16,
          }}>Video</Text>
         </TouchableOpacity>
         <TouchableOpacity style={[styles.selected,{
                    backgroundColor:
                      selectedTab == 'Tags' ? colors.main : colors.white,
                  }]} onPress={()=>{
          setSelectedTab('Tags')
         }}>
         <Text style={{
            color: selectedTab == 'Tags' ? 'white' : '#71B1A1',
            fontWeight: '800',
            fontSize: selectedTab == 'Tags' ? 14 : 16,
          }}>Tags</Text>
         </TouchableOpacity>
      </View>
      {selectedTab=='Recipe' &&  <View
         style={{
           marginTop: vh(20),
           marginHorizontal: vw(20),
          
          flex:1
         }}>
 
          
         {recipes.length==0 ? (
           
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <Text>No Recipes Yet</Text>
          </View>
         ) : (
 
           
           
           <FlatList
             showsVerticalScrollIndicator={false}
             data={recipes}
             renderItem={renderItem}
             keyExtractor={(item, index) => index.toString()}
            
           />
      )} 
       </View>
      }

      {/* <View
        style={{
          marginTop: vh(20),
          marginHorizontal: vw(20),
         
         flex:1
        }}>

         
        {recipes.length==0 ? (
          
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>No Recipes Yet</Text>
         </View>
        ) : (

          
          
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recipes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
           
          />
     )} 
      </View> */}
      


      
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  selected: {
    backgroundColor:colors.main,
    paddingHorizontal:vw(30),
    paddingVertical:vh(10),
    borderRadius:vh(10),
  },
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
     marginTop:vh(20),
     flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginHorizontal:vh(20)
    // borderRadius: 10,
    // paddingHorizontal: vh(20),
    // paddingVertical: vw(10),
  },

  card: {
        
    height: vh(170),
    marginBottom: vh(15),
    marginRight: vw(15),
    backgroundColor: '#f9f9f9',
    justifyContent: 'flex-end',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: vh(10),
    color: 'white',
  },
  recipeSource: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F0F0F0',
    marginTop: vh(4),
  },
  transparentView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.3)',
    justifyContent: 'flex-end',
    paddingBottom: vh(15),
    paddingStart: vw(10),
    borderRadius: 10,
  },
  point: {
    fontSize: 13,
    marginLeft: 4,
  },
  review: {
    width: 50,
    height: 23,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFE1B3',
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },  
});
