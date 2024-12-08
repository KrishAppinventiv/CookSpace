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
import React, {useState, useEffect, useRef} from 'react';
import {Images} from '../../assets';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../navigator/screenNames';
import Modal from 'react-native-modal';

import {
  CUISINE_FILTERS,
  DIET_FILTERS,
  DISH_FILTERS,
  HEALTH_FILTERS,
} from '../../components/data';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigator/types';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, ScreenNames.Signin>;

const Search = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [selectedDish, setSelectedDish] = useState('');
  const [selectedCusiness, setSelectedCusiness] = useState('');
  const [selectedHealth, setSelectedHealth] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const searchInputRef = useRef(null);

  const [ShowModal, setShowModal] = useState(false);

  const navigation: any = useNavigation<SearchScreenNavigationProp>();



  useEffect(() => {
    
    searchInputRef.current?.focus();
    

  }, []);

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

    let url = '';

    if (
      selectedDish == '' &&
      selectedCusiness == '' &&
      selectedHealth == '' &&
      selectedDiet == ''
    ) {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}`;
    } else if (selectedDish != '') {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&dishType=${selectedDish}`;
    } else if (selectedCusiness != '') {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&cuisineType=${selectedCusiness}`;
    } else if (selectedHealth != '') {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&health =${selectedHealth}`;
    } else if (selectedDiet != '') {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&diet=${selectedDiet}`;
    } else if (selectedDish != '' && selectedCusiness != '') {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&cuisineType=${selectedCusiness}&dishType=${selectedDish}`;
    } else if (
      selectedDish != '' &&
      selectedCusiness != '' &&
      selectedHealth != ''
    ) {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&cuisineType=${selectedCusiness}&dishType=${selectedDish}&health=${selectedHealth}`;
    } else if (selectedCusiness != '' && selectedHealth != '') {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&cuisineType=${selectedCusiness}&health=${selectedHealth}`;
    } else if (selectedDiet != '' && selectedHealth != '') {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&diet=${selectedDiet}&health=${selectedHealth}`;
    } else if (selectedDiet != '' && selectedCusiness != '') {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&diet=${selectedDiet}&cuisineType=${selectedCusiness}`;
    } else if (selectedDiet != '' && selectedDish != '') {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&diet=${selectedDiet}&dishType=${selectedDish}`;
    } else if (
      selectedDiet != '' &&
      selectedCusiness != '' &&
      selectedHealth != ''
    ) {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&cuisineType=${selectedCusiness}&diet=${selectedDiet}&health=${selectedHealth}`;
    } else if (
      selectedDiet != '' &&
      selectedCusiness != '' &&
      selectedDish != ''
    ) {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&cuisineType=${selectedCusiness}&diet=${selectedDiet}&dishType=${selectedDish}`;
    } else if (
      selectedDiet != '' &&
      selectedHealth != '' &&
      selectedDish != ''
    ) {
      url = `https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${search}&health=${selectedHealth}&diet=${selectedDiet}&dishType=${selectedDish}`;
    }

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => {
        setRecipes(result.hits);
        console.log('actual data---->>>', result.hits);
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
            <Image source={Images.star} style={styles.star} />
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

      <View style={styles.mainView}>
        <Text
          style={styles.head}>
          Search Recipes
        </Text>
      </View>

      <View
        style={styles.boxView}>
        <View style={styles.searchBox}>
          <Image
            source={Images.searchs}
            style={styles.search}
          />
          <TextInput
            ref={searchInputRef}
            value={search}
            onChangeText={setSearch}
            placeholder="Search recipe"
            style={{fontSize: 17, marginHorizontal: 10}}
            autoFocus={true}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setShowModal(true);
          }}>
          <View style={styles.filter}>
            <Image
              source={Images.filter}
              style={styles.filterImg}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: vw(20), marginTop: vh(25)}}>
        {search != '' ? (
          <Text style={styles.response}>Search Result</Text>
        ) : (
          <Text style={styles.response}>Recent Search</Text>
        )}
      </View>
      {loading && search === '' ? (
          <View
          style={styles.nosearchView}>
            <Image source={Images.nosearch} style={styles.nosearchImg}/>
            <Text style={styles.nosearchText}>No Previous History...</Text>
        </View>
         
        ) : (
      <View
        style={styles.load}>
        
          <FlatList
            showsVerticalScrollIndicator={false}
            data={search === '' ? previousSearches : recipes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />
        
      </View>)}

      <Modal
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => {
          setShowModal(false);
        }}
        isVisible={ShowModal}
        backdropColor="rgba(0,0,0,0.5)"
        style={{margin: 0}}  >
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.filterText}>
              Filter Search
            </Text>
          </View>
          <ScrollView style={styles.scroll}>
            <Text
              style={styles.dishTyp}>
              Dish Type
            </Text>
            <View style={styles.flatView}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={DISH_FILTERS}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.filterItem,
                        {
                          backgroundColor:
                            selectedDish == item ? colors.main : colors.white,
                          borderWidth: selectedDish == item ? 0 : 1,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => {
                        if (selectedDish == item) {
                          setSelectedDish('');
                        } else {
                          setSelectedDish(item);
                        }
                      }}>
                      <Text
                        style={[
                          styles.filtertext,
                          {
                            color:
                              selectedDish == item ? colors.white : colors.main,
                            fontWeight: selectedDish == item ? '700' : '300',
                          },
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <Text
             style={styles.dishTyp}>
              Cusiness
            </Text>
            <View style={styles.flatMargin}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={CUISINE_FILTERS}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.filterItem,
                        {
                          backgroundColor:
                            selectedCusiness == item
                              ? colors.main
                              : colors.white,
                          borderWidth: selectedCusiness == item ? 0 : 1,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => {
                        if (selectedCusiness == item) {
                          setSelectedCusiness('');
                        } else {
                          setSelectedCusiness(item);
                        }
                      }}>
                      <Text
                        style={[
                          styles.filtertext,
                          {
                            color:
                              selectedCusiness == item
                                ? colors.white
                                : colors.main,
                            fontWeight:
                              selectedCusiness == item ? '700' : '300',
                          },
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <Text
              style={styles.dishTyp}>
              Health
            </Text>
            <View  style={styles.flatMargin}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={HEALTH_FILTERS}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.filterItem,
                        {
                          backgroundColor:
                            selectedHealth == item ? colors.main : colors.white,
                          borderWidth: selectedHealth == item ? 0 : 1,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => {
                        if (selectedHealth == item) {
                          setSelectedHealth('');
                        } else {
                          setSelectedHealth(item);
                        }
                      }}>
                      <Text
                        style={[
                          styles.filtertext,
                          {
                            color:
                              selectedHealth == item
                                ? colors.white
                                : colors.main,
                            fontWeight: selectedHealth == item ? '700' : '300',
                          },
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <Text
              style={styles.dishTyp}>
              Diet
            </Text>
            <View style={styles.flatMargin}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                numColumns={4}
                data={DIET_FILTERS}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.filterItems,
                        {
                          backgroundColor:
                            selectedDiet == item ? colors.main : colors.white,
                          borderWidth: selectedDiet == item ? 0 : 1,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => {
                        if (selectedDiet == item) {
                          setSelectedDiet('');
                        } else {
                          setSelectedDiet(item);
                        }
                      }}>
                      <Text
                        style={[
                          styles.filtertext,
                          {
                            color:
                              selectedDiet == item ? colors.white : colors.main,
                            fontWeight: selectedDiet == item ? '700' : '300',
                          },
                        ]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.filtButton}
              onPress={() => {
                setShowModal(false);
                searchRecipe();
              }}>
              <Text
                style={styles.filtText}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Search;

