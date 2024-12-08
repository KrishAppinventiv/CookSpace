import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ScreenNames} from '../../navigator/screenNames';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Images} from '../../assets';
import {MEAL_FILTERS, NEW_RECIPE} from '../../components/data';
import {vh, vw} from '../../theme/dimensions';

import {useDispatch, useSelector} from 'react-redux';

import {getAuth} from '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';
import {
  addFavoriteRecipe,
  fetchFavoritesFromFirestore,
  removeFavoriteRecipe,
} from '../../redux/firebaseActions';
import styles from './styles';


const Home = () => {
  const navigation: any = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const favoriteItems = useSelector(state => state.favorites.items || []);
  console.log('Home favourite----->>', favoriteItems);
  const isFavorite = label => {
    const safeFavoriteItems = Array.isArray(favoriteItems) ? favoriteItems : [];
    return safeFavoriteItems.some(item => item.recipe.recipe.label === label);
  };

 

  useEffect(() => {
    dispatch(fetchFavoritesFromFirestore());
  
  }, [dispatch]);

  useEffect(() => {
    getTrendyRecipes();
    const fetchname = async () => {
      const userId = getAuth().currentUser?.uid;

      const userDoc = await getFirestore()
        .collection('users')
        .doc(userId)
        .get();
     
      const name = userDoc.data()?.name || '';
      setName(name);
    };
    fetchname();
  }, []);

  const getTrendyRecipes = () => {
    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=none`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        setRecipes(result.hits);
        setLoading(false);
      })
      .catch(error => console.log('error', error));
  };
  const handlesaveToggle = item => {
    if (isFavorite(item.recipe.label)) {
      dispatch(removeFavoriteRecipe(item));
    } else {
      dispatch(addFavoriteRecipe(item));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <View style={styles.topView}>
        <Image source={Images.top} style={styles.banner} />

        <View style={styles.transparentView}>
          <View style={styles.margin}>

         
          <Text style={styles.logo}>Hello, {name.split(' ').shift()}</Text>
          <Text style={styles.cookText}>What are you cooking today?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.searchBox}
            onPress={() => navigation.navigate(ScreenNames.Search)}>
            <Image
              source={Images.search}
              style={styles.searchImg}
            />
            <Text style={styles.placeholder}>Please search here...</Text>
          </TouchableOpacity>
          </View>
          <Text style={styles.searchRecipe}>
            Search 1000+ recipes easily with one click
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8FBC8B" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <Text style={styles.heading}>Categories </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={MEAL_FILTERS}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.categoryItem}
                  onPress={() => {
                    navigation.navigate(ScreenNames.Category, {
                      category: item,
                    });
                  }}>
                  <View style={styles.card}>
                    <Image source={item.icon} style={styles.categoryIcon} />
                  </View>
                  <Text style={styles.category}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <Text style={styles.heading}>Trendy Recipes</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={recipes}
            renderItem={({item, index}) => {
              const favorite = isFavorite(item.recipe.label);
              console.log('item.id', item.recipe.label);
              return (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.recipeItem}
                    onPress={() => {
                      navigation.navigate(ScreenNames.Details, {
                        data: item,
                      });
                    }}>
                    <View style={styles.flat}>
                      <Text style={styles.dish}>{item.recipe.label}</Text>
                      <View
                        style={styles.min}>
                        <View>
                          <Text style={styles.timeText}>Time</Text>
                          <Text>15 mins</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handlesaveToggle(item)}>
                          <View
                            style={styles.saveView}>
                            <Image
                              source={
                                favorite ? Images.active : Images.inactive
                              }
                              style={{height: vh(16), width: vw(16)}}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={styles.trend}>
                      <Image
                        source={{uri: item.recipe.image}}
                        style={styles.trendyIcon}
                        resizeMode="cover"
                      />
                      <View style={styles.review}>
                        <Image
                          source={Images.star}
                          style={{height: 15, width: 15}}
                        />
                        <Text style={styles.point}>4.2</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <Text style={styles.heading}>New Recipes </Text>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={NEW_RECIPE}
            renderItem={({item, index}) => {
              console.log(item.title);
              const count = item.count;
              return (
                <TouchableOpacity activeOpacity={0.7}>
                  <View key={index} style={styles.newrecipe}>
                    <View style={styles.cards}>
                      <Text style={styles.totle}>
                        {item.title.substring(0, 15)}...
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        {Array.from({length: count}).map((_, idx) => (
                          <Image
                            key={idx}
                            source={Images.star}
                            style={styles.star}
                          />
                        ))}
                      </View>

                      <View
                        style={styles.newView}>
                        <View
                          style={styles.innerNew}>
                          <Image
                            source={item.image}
                            style={styles.newImg}
                          />
                          <Text style={styles.chefText}>
                            By {item.name}
                          </Text>
                        </View>
                        <View
                          style={styles.innerViews}>
                          <Image
                            source={Images.timer}
                            style={styles.timer}
                          />
                          <Text style={styles.mins}>
                            {item.time} mins
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={styles.recipeImg}>
                      <Image
                        source={item.icon}
                        style={styles.newIcon}
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Home;

