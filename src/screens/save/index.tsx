import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Images } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import { vh, vw } from '../../theme/dimensions'
import { useSelector } from 'react-redux'
import { ScreenNames } from '../../navigator/screenNames'
import { colors } from '../../theme'
import styles from './styles'

const Save = () => {
    const navigation:any = useNavigation();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const favoriteItems = useSelector(state => state.favorites.items);
    const renderItem = ({item}) => 
      {
        const recipe = item.recipe; 
       
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
    {favoriteItems.length==0 ? <View style={styles.savedView}> 
        <Image source={Images.bookmark} style={styles.saveImg}/>
      <Text style={styles.empty}>Your Saved Recipe Is Currently Empty</Text>
    </View>: <View
        style={{
          marginTop: vh(20),
          marginHorizontal: vw(20),
         
         flex:1
        }}>
        
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recipes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
           
          />
       
      </View>}
   
    </SafeAreaView>
  )
}

export default Save

