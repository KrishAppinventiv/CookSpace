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
import {ScreenNames} from '../../navigator/screenNames';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Images} from '../../assets';
import {vh, vw} from '../../theme/dimensions';
import {RouteProp} from '@react-navigation/core';
import styles from './styles';

interface Recipe {
  recipe: {
    label: string;
    source: string;
    image: string;
  };
}

type RootStackParamList = {
  Categories: {category: {title: string}};
  Details: {data: any};
  
};

const Categories = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Categories'>>();
  const navigation: any = useNavigation();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryTitle = route.params?.category.title;

 

  useEffect(() => {
    if (categoryTitle) {
      getCategoryRecipes(categoryTitle);
    } else {
     
    }
  }, [categoryTitle]);

  const getCategoryRecipes = (category: string) => {
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${category}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
       
        setRecipes(result.hits);
        setLoading(false);
      })
      .catch(error => console.log('error', error));
  };

  const renderItem = ({item}: {item: Recipe}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.lefts} style={styles.back} />
      </TouchableOpacity>
      <View style={styles.main}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={recipes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Categories;


