import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Images } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import { vh, vw } from '../../theme/dimensions'
import { useSelector } from 'react-redux'
import { ScreenNames } from '../../navigator/screenNames'
import { colors } from '../../theme'

const Save = () => {
    const navigation:any = useNavigation();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const favoriteItems = useSelector(state => state.favorites.items);
    console.log("favourite in save----->>>",favoriteItems)
    
    const renderItem = ({item}) => 
      
      {
        const recipe = item.recipe; 
        console.log("gughushu", recipe.recipe.source)
        return (
        <TouchableOpacity activeOpacity={.8} onPress={() => {
          navigation.navigate(ScreenNames.Details, {
            data: recipe, 
          });
        }}>
      <View style={styles.card}>
        <Image source={{uri:recipe.recipe.image}} style={styles.recipeImage} />
  
      
        <View style={styles.transparentView}>
  
        <View style={styles.review}>
          <Image source={Images.star} style={{height: 15, width: 15}} />
          <Text style={styles.point}>4.2</Text>
        </View>
          <Text style={styles.recipeTitle}>{recipe.recipe.label}</Text>
          <Text style={styles.recipeSource}>{recipe.recipe.source}</Text>
         
        </View>
  
        
      </View>
      </TouchableOpacity>
    );
  };


    useEffect(() => {
     
     
     setRecipes(favoriteItems)
  
    }, [favoriteItems]);

    
  return (
    <SafeAreaView style={styles.container}>
   

    <View style={styles.head}>
      <Text
        style={styles.heading}>
        Saved Recipes
      </Text>
    </View>
    {favoriteItems.length==0 ? <View style={{justifyContent:"center",alignItems:'center',flex:1,marginHorizontal:vw(30),}}> 
        <Image source={Images.serving} style={{height:vh(140),width:vh(140)}}/>
      <Text style={{textAlign:'center', fontSize:vh(18),fontWeight:'500',color:colors.main,marginTop:vh(20),fontFamily:'Poppins'}}>Your Saved Recipe Is Currently Empty</Text>
    </View>: <View
        style={{
          marginTop: vh(20),
          marginHorizontal: vw(20),
         
         flex:1
        }}>
        {/* {loading ? (
          <ActivityIndicator />
        ) : ( */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recipes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
           
          />
        {/* )} */}
      </View>}
   
    </SafeAreaView>
  )
}

export default Save

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: vh(23),
    fontWeight: '600',
    alignSelf: 'center',
  },
  head: {
    justifyContent: 'center',
    marginTop:vh(10),
  },
    container: {
        flex: 1,
        backgroundColor: 'white',
        
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
})