import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView, ActivityIndicator
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import styles from './styles';
import strings from '../../utils/string';
import {ScreenNames} from '../../navigator/screenNames';
import {useNavigation} from '@react-navigation/native';
import SplashScreen from '../splashScreen';
import {Images} from '../../assets';
import {MEAL_FILTERS, NEW_RECIPE} from '../../components/data';

const Home = () => {
  const navigation: any = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    getTrendyRecipes();
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <View style={styles.topView}>
        <Image source={Images.top} style={styles.banner} />

        <View style={styles.transparentView}>
          <Text style={styles.logo}>Hello, Krishna</Text>
          <Text style={styles.cookText}>What are you cooking today?</Text>
          <TouchableOpacity activeOpacity={0.8} style={styles.searchBox}>
            <Image source={Images.search} style={{height: 30, width: 30}} />
            <Text style={styles.placeholder}>Please search here...</Text>
          </TouchableOpacity>

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
              <TouchableOpacity activeOpacity={0.7} style={styles.categoryItem}>
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
            return (
              <View>
                <TouchableOpacity activeOpacity={0.7} style={styles.recipeItem} onPress={() => {
                  navigation.navigate(ScreenNames.Details,{
                    data:item
                  })
                }}>
                

                  <View
                    style={styles.flat}>
                    <Text
                      style={styles.dish}>
                      {item.recipe.label}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 1,
                      shadowColor: 'rgba(0,0,0,.3)',
                      shadowOpacity: 10,
                    }}>
                    <Image
                      source={{uri: item.recipe.image}}
                      style={styles.trendyIcon}
                      resizeMode="cover"
                      
                    />
                    <View
                      style={styles.review}>
                      <Image
                        source={Images.star}
                        style={{height: 15, width: 15}}
                      />
                      <Text style={styles.point}>4.2</Text>
                    </View>
                  </View>
                  {/* </View> */}
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
                <View
                  key={index}
                  style={styles.newrecipe}>
                  <View style={styles.cards}>
                    <Text style={{fontSize: 18, fontWeight: '600'}}>
                      {item.title.substring(0, 15)}...
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      {Array.from({length: count}).map((_, idx) => (
                        <Image
                          key={idx}
                          source={Images.star}
                          style={{
                            marginHorizontal: 1,
                            marginTop: 5,
                            height: 15,
                            width: 15,
                          }}
                        />
                      ))}
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 15,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingRight: 30,
                        }}>
                        <Image
                          source={item.image}
                          style={{
                            height: 30,
                            width: 30,
                            borderRadius: 10,
                            marginRight: 10,
                          }}
                        />
                        <Text style={{color: '#A9A9A9', fontSize: 15}}>
                          By {item.name}
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={Images.timer}
                          style={{height: 19, width: 19, marginRight: 5}}
                        />
                        <Text style={{color: '#A9A9A9', fontSize: 15}}>
                          {item.time} mins
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 1,
                      right: 1,
                      shadowColor: 'rgba(0,0,0,.6)',
                      shadowOpacity: 10,
                    }}>
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
      </ScrollView> )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  newrecipe: {
    paddingVertical: 50,
    backgroundColor: 'white',
    marginHorizontal: 10,
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  point: {
    fontSize: 13,
    marginLeft: 4,
  },
  review: {
    width: 50,
    height: 28,
    position: 'absolute',
    top: 20,
    right: 0,
    backgroundColor: '#FFE1B3',
    borderRadius: 17,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dish: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 30,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  flat: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    borderRadius: 12,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topView: {
    height: '45%',
  },
  banner: {
    height: '100%',
    width: '100%',
  },
  transparentView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    width: '90%',
    height: 60,

    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 60,
  },
  placeholder: {
    marginLeft: 15,
    fontSize: 16,
    color: '#9e9e9e',
  },
  logo: {
    fontSize: 30,
    color: 'white',
    position: 'absolute',
    top: 60,
    left: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  cookText: {
    fontSize: 20,
    color: '#E6E6E6',
    position: 'absolute',
    top: 95,
    left: 20,
    fontWeight: '500',
  },
  searchRecipe: {
    fontSize: 18,
    color: 'white',

    alignSelf: 'center',
    marginTop: 15,
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
  },
  categoryItem: {
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    padding: 20,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 6,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cards: {
    padding: 20,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 6,
    backgroundColor: 'white',

    justifyContent: 'center',
    borderRadius: 10,
  },
  categoryIcon: {
    width: 50,
    height: 50,
  },
  trendyIcon: {
    marginTop: 5,
    width: 130,
    height: 130,
    borderRadius: 60,
  },
  newIcon: {
    marginTop: 5,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  category: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: 10,
  },

  recipeItem: {
    width: 180,
    height: 250,
    margin: 10,
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',

    flex: 1,
    borderRadius: 10,
  },
  scroll: {
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
});
