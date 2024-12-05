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
import { vh, vw } from '../../theme/dimensions';

const Categories = () => {
  const route = useRoute();
  const navigation: any = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = route.params.category.title


 console.log(url)

  useEffect(() => {
    getCategoryRecipes();
  }, []);

  const getCategoryRecipes = () => {
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${url}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log('Search Results:', result.hits);
        setRecipes(result.hits);
        setLoading(false);
      })
      .catch(error => console.log('error', error));
  };

  const renderItem = ({item}) => (
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
          <View style={styles.transparentViews}></View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>

<TouchableOpacity onPress={() => navigation.goBack()}>
    
        <Image source={Images.lefts} style={styles.back} />
      </TouchableOpacity>
      <View
        style={styles.main}>
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

const styles = StyleSheet.create({
  main: {
    marginTop: vh(20),
    marginHorizontal: vw(20),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  columnWrapper: {
    justifyContent: 'space-between',
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
  card: {
    width: vw(160),
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
  back: {
    height: vh(30),
    width: vw(20),
    marginStart: vw(10),
  },
});
