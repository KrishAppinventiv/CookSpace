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

const Search = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [selectedDish, setSelectedDish] = useState('');
  const [selectedCusiness, setSelectedCusiness] = useState('');
  const [selectedHealth, setSelectedHealth] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');

  const [ShowModal, setShowModal] = useState(false);

  const navigation: any = useNavigation();

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
            <Image source={Images.star} style={{height: 15, width: 15}} />
            <Text style={styles.point}>4.2</Text>
          </View>
          <Text style={styles.recipeTitle}>{item.recipe.label}</Text>
          <Text style={styles.recipeSource}>{item.recipe.source}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // console.log('previous', previousSearches);

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

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setShowModal(true);
          }}>
          <View style={styles.filter}>
            <Image
              source={Images.filter}
              style={{height: vh(25), width: vw(25)}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: vw(20), marginTop: vh(25)}}>
        {search != '' ? (
          <Text style={{fontSize: 20, fontWeight: '600'}}>Search Result</Text>
        ) : (
          <Text style={{fontSize: 20, fontWeight: '600'}}>Recent Search</Text>
        )}
      </View>

      <View
        style={{
          marginTop: vh(20),
          marginHorizontal: vw(20),
          paddingBottom: vh(140),
        }}>
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

      <Modal
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => {
          setShowModal(false);
        }}
        isVisible={ShowModal}
        backdropColor="rgba(0,0,0,0.5)"
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={{fontSize: vh(17), fontWeight: '600'}}>
              Filter Search
            </Text>
          </View>
          <ScrollView style={{paddingBottom: vh(30)}}>
            <Text
              style={{
                marginTop: vh(20),
                marginStart: vw(13),
                fontSize: vh(16),
                fontWeight: '700',
              }}>
              Dish Type
            </Text>
            <View style={{marginHorizontal: vw(14)}}>
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
              style={{
                marginTop: vh(20),
                marginStart: vw(13),
                fontSize: vh(16),
                fontWeight: '700',
              }}>
              Cusiness
            </Text>
            <View style={{marginHorizontal: vw(14)}}>
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
              style={{
                marginTop: vh(20),
                marginStart: vw(13),
                fontSize: vh(16),
                fontWeight: '700',
              }}>
              Health
            </Text>
            <View style={{marginHorizontal: vw(14)}}>
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
              style={{
                marginTop: vh(20),
                marginStart: vw(13),
                fontSize: vh(16),
                fontWeight: '700',
              }}>
              Diet
            </Text>
            <View style={{marginHorizontal: vw(13)}}>
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
              style={{
                backgroundColor: colors.main,
                marginHorizontal: vw(60),
                marginTop: vh(30),
                padding: 20,
                borderRadius: vh(30),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: vh(20),
              }}
              onPress={() => {
                setShowModal(false);
                searchRecipe();
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: '600',
                  fontSize: vh(15),
                }}>
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

const styles = StyleSheet.create({
  filtertext: {
    color: colors.main,
    fontWeight: '300',
  },
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
  modalView: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: vh(20),
    borderTopStartRadius: vh(20),
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vh(20),
    paddingBottom: vh(10),
  },
  filterItem: {
    marginRight: vh(20),

    marginTop: vh(12),
    paddingHorizontal: vh(20),
    paddingVertical: vh(10),
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: vh(10),
  },
  filterItems: {
    marginRight: vh(13),

    marginTop: vh(12),
    paddingHorizontal: vh(13),
    paddingVertical: vh(10),
    borderWidth: 1,
    borderColor: colors.main,
    borderRadius: vh(10),
  },
});
