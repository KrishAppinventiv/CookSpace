import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {contains} from 'validator';
import {Images} from '../../assets';
import {colors} from '../../theme';
import {vh, vw} from '../../theme/dimensions';
import {ScreenNames} from '../../navigator/screenNames';

const Details = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  

  let data;

  data = route.params?.data || {};

  console.log(data);

  
  return (
    <View style={styles.container}>
      <View style={styles.headDish}>
        <Image
          source={{uri: data.recipe.image}}
          style={styles.banner}
          resizeMode="cover"
        />
        <View style={styles.blackOverlap}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.ImageView}>
              <Image source={Images.left} style={styles.back} />
            </View>
            
          </TouchableOpacity>
          <View style={styles.timeView}>
            <View style={styles.minView}>
              <Image
                source={Images.timer}
                tintColor="white"
                style={styles.timer}
              />
              <Text style={styles.prepare}>
                {data.recipe.cook ? data.recipe.cook : '20 min'}
              </Text>
            </View>

            <View style={styles.saveView}>
              <Image source={Images.active} style={styles.save} />
            </View>
          </View>
        </View>
      </View>

     

      <View style={styles.main}>
        <Text
          style={styles.labelText}>
          {data.recipe.label}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#A9A9A9',
            fontFamily: 'Poppins',
          }}>
          (13k Reviews)
        </Text>
      </View>

      {data.recipe.source?<View style={styles.mainContain}>
        <View style={styles.chefContain}>
          <Image
            source={Images.chefpic}
            resizeMode="cover"
            style={styles.chefImg}
          />

          <View style={styles.left}>
            <Text style={styles.chef}>{data.recipe.source}</Text>
            <View style={styles.locView}>
              <Image source={Images.location} style={styles.locImg} />
              <Text style={styles.locText}>Lagos,Nigeria</Text>
            </View>
          </View>
        </View>

        <View style={styles.followView}>
          <Text style={styles.followText}>Follow</Text>
        </View>
      </View>:null}
      <View>
        <FlatList
          data={[
            'Health',
            'Cautions',
            'Ingredients',
            'Diet',
            'Meal Type',
            'Cuisines',
            'Dish Type',
          ]}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.typeItem}
                onPress={() => {
                  setSelectedTab(index);
                }}>
                <View
                  style={[
                    styles.category,
                    {
                      backgroundColor:
                        selectedTab == index ? colors.main : colors.white,
                    },
                  ]}>
                  <Text
                    style={{
                      color: selectedTab == index ? 'white' : '#71B1A1',
                      fontWeight: '800',
                      fontSize: selectedTab == index ? 14 : 16,
                    }}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <FlatList
        data={
          selectedTab == 0
            ? data.recipe.healthLabels
            : selectedTab == 1
            ? data.recipe.cautions
            : selectedTab == 2
            ? data.recipe.ingredientLines
            : selectedTab == 3
            ? data.recipe.dietLabels
            : selectedTab == 4
            ? data.recipe.mealType
            : selectedTab == 5
            ? data.recipe.cuisineType
            : data.recipe.dishType
        }
        renderItem={({item, index}) => {
          const capitalizeAfterSlash = str => {
            return str.replace(/(^\w|\s\w|\/\w)/g, match =>
              match.toUpperCase(),
            );
          };

          const capitalizedItem = capitalizeAfterSlash(item);
          return (
            <View style={styles.flatView}>
              <View style={styles.ingredient}>
                <Text
                  style={styles.flatText}>
                  {capitalizedItem}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  flatView: {
    marginHorizontal: vw(20),
    marginTop: vh(8),
  },
  flatText: {
    marginStart: vw(20),
    fontSize: vh(16),
    fontWeight: '600',
    color: '#235347',
  },
  labelText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    width: '60%',
  },
  ingredient: {
    backgroundColor: '#D9D9D9',
    marginBottom: vh(10),
    justifyContent: 'center',
    paddingTop: vh(28),
    paddingBottom: vh(28),
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 5,
  },
  category: {
    backgroundColor: colors.white,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: vh(25),
    paddingVertical: vw(10),
  },
  left: {
    marginLeft: 10,
  },
  locView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  chef: {
    fontSize: 18,
    fontWeight: '600',
  },
  locImg: {
    height: 29,
    width: 29,
    marginRight: 6,
  },
  locText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A9A9A9',
  },
  followText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '700',
  },
  followView: {
    paddingHorizontal: 30,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    opacity: 0.9,
  },
  chefContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chefImg: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
  mainContain: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
  },

  tooltipContainer: {
    position: 'absolute',
    top: vh(50),
    right: vw(20),
    backgroundColor: 'white',
    padding: vh(10),
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 10,
    elevation: 5,
  },
  tooltipItem: {
    paddingVertical: vh(10),
    paddingHorizontal: vw(15),
    flexDirection: 'row',
  },
  tooltipText: {
    fontSize: 17,
    color: colors.black,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveView: {
    height: 33,
    width: 33,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 18,
  },
  save: {
    height: 23,
    width: 23,
    alignSelf: 'center',
  },
  prepare: {
    color: 'white',
    fontSize: 17,
    marginRight: 10,
  },
  timer: {
    height: 22,
    width: 22,
    marginRight: 5,
  },
  minView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  timeView: {
    bottom: 7,
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  back: {
    height: 32,
    width: 32,
  },
  ImageView: {
    width: vw(35),
    height: vh(35),
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: '#A9A9A9',
    top: vh(41),
    left: vw(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackOverlap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  headDish: {
    width: '100%',
    height: '38%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  typeItem: {
    marginStart: vw(10),
    marginTop: vh(25),
    paddingBottom: vh(10),
  },
});
