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
import styles from './styles';

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
          style={styles.review}>
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


