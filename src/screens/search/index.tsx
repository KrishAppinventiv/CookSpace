import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Images} from '../../assets';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import { ScreenNames } from '../../navigator/screenNames';

const Search = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
 

  const navigation:any = useNavigation();

  const searchRecipe = () => {
    if (!search) return;

    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setRecipes(result.hits);
        if (result.hits.length > 0) {
            setPreviousSearches(result.hits);
          }
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };
   
  useEffect(() => {
    if (search) {
      const timer = setTimeout(() => {
        searchRecipe();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [search]);

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
        <View style={styles.transparentViews}></View>
      </View>

      
    </View>
    </TouchableOpacity>
  );

  console.log("previous",previousSearches)

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={Images.lefts} style={styles.back} />
      </TouchableOpacity>

      <View style={{justifyContent: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: vh(23),
            fontWeight: '600',
            alignSelf: 'center',
          }}>
          Search Recipes
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: vw(20),
          marginTop: vh(30),
        }}>
        <View style={styles.searchBox}>
          <Image
            source={Images.searchs}
            style={{height: vh(25), width: vw(25), tintColor: '#D9D9D9'}}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search recipe"
            style={{fontSize: 17, marginHorizontal: 10}}
          />
        </View>
        <View style={styles.filter}>
          <Image
            source={Images.filter}
            style={{height: vh(25), width: vw(25)}}
          />
        </View>
      </View>

      <View style={{marginHorizontal: vw(20), marginTop: vh(25)}}>
        {search != '' ? (
          <Text style={{fontSize: 20, fontWeight: '600'}}>Search Result</Text>
        ) : (
          <Text style={{fontSize: 20, fontWeight: '600'}}>Recent Search</Text>
        )}
      </View>

      <View style={{marginTop: vh(20), marginHorizontal: vw(20),paddingBottom:vh(140)}}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={search === '' ? previousSearches : recipes} 
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

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  ImageView: {
    width: vw(35),
    height: vh(35),
    borderRadius: 20,

    backgroundColor: '#E8E8E8',

    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    height: vh(30),
    width: vw(20),
    marginStart: vw(10),
  },
  searchBox: {
    width: vw(265),
    height: vh(50),
    paddingHorizontal: vw(10),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    backgroundColor: 'white',
  },

  filter: {
    width: vw(50),
    height: vh(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: vw(20),
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    backgroundColor: colors.main,
  },
  columnWrapper: {
    justifyContent: 'space-between',
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
    // elevation: 3,
    // shadowColor: 'rgba(0,0,0,.3)',
    // shadowOpacity: 1,
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
