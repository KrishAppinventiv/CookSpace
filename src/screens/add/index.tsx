import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {vh, vw} from '../../theme/dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme';
import { arrayUnion, doc, getDoc, getFirestore, updateDoc } from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { ScreenNames } from '../../navigator/screenNames';



const db = getFirestore();


const Add = () => {
  const navigation = useNavigation();
  const [imgUri, SetImgUri] = useState(false);
  const [cook, setCook] = useState('');
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [serve, setServe] = useState('');

  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [healths, setHealths] = useState<string[]>(['']);
  const [diets, setDiets] = useState<string[]>(['']);
  const [dishType, setDishType] = useState('');
  const [mealType, setMealType] = useState('');
  const [cuisines, setCuisines] = useState('');
  const serveInputRef = useRef<TextInput>(null);
  const cookInputRef = useRef<TextInput>(null);
  const ingredientInputRef = useRef<TextInput>(null);
  const healthInputRef = useRef<TextInput>(null);
  const dietInputRef = useRef<TextInput>(null);
  const dishTypeInputRef = useRef<TextInput>(null);
  const mealTypeInputRef = useRef<TextInput>(null);
  const cuisinesInputRef = useRef<TextInput>(null);

  const handleUploadFromGallery = async () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        console.log('Image URI: ', imageUri);
        setUrl(imageUri);
        SetImgUri(true);
      }
    });
  };

  const collectRecipeData = () => {
    const recipeData = {
      title,
      serve,
      cook,
      ingredients,
      healths,
      diets,
      dishType,
      mealType,
      cuisines,
      imageUrl: url, 
    };
  
    return recipeData;
  };

  const handleTextChange = (text: string, field: string, index: number) => {
    if (field === 'title') {
      setTitle(text);
    } else if (field === 'serve') {
      setServe(text);
    } else if (field === 'cook') {
      setCook(text);
    } else if (field === 'ingredient') {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index] = text;
      setIngredients(updatedIngredients);
    } else if (field === 'diet') {
      const updatedDiets = [...diets];
      updatedDiets[index] = text;
      setDiets(updatedDiets);
    } else if (field === 'mealType') {
      setMealType(text);
    } else if (field === 'dishType') {
      setDishType(text);
    } else if (field === 'health') {
      const updatedHealths = [...healths];
      updatedHealths[index] = text;
      setHealths(updatedHealths);
    }else if(field === 'cuisines'){
      setCuisines(text)
    }
  };



  const handleAddRecipe = async () => {
    const recipeData = collectRecipeData();
  
    const userId = getAuth().currentUser?.uid;
   if(userId){

    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
    
      let postData = userDoc.exists ? userDoc.data().postData || [] : [];
      
     
      postData.push(recipeData);
    
      
      await updateDoc(userDocRef, {
        postData: postData,
      });
    
      console.log('Recipe added successfully!');
      setCook('');
      setTitle('');
      setServe('');
      setUrl('');
      setDishType('');
      setMealType('');
      setCuisines('');
      setHealths(['']);
      setDiets(['']);
      setIngredients(['']);
      SetImgUri(false);
      navigation.navigate(ScreenNames.Profile)
    } catch (error) {
      console.error('Error adding favorite recipe: ', error);
    }
   
   }
    
  };

  const handleFocusNextInput = (nextInputRef: React.RefObject<TextInput>) => {
    if (nextInputRef?.current) {
      nextInputRef.current.focus();
    }
  };

  const addNewInputField = (field: 'ingredient' | 'health' | 'diet') => {
    if (field === 'ingredient') {
      setIngredients([...ingredients, '']);
    } else if (field === 'health') {
      setHealths([...healths, '']);
    } else if (field === 'diet') {
      setDiets([...diets, '']);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.cancel} style={styles.back} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTooltipVisible(true)}>
          <Image source={Images.options} style={styles.options} />
        </TouchableOpacity>
      </View>
      <View style={styles.headDish}>
        {imgUri ? (
          <Image source={{uri: url}} style={styles.banner} resizeMode="cover" />
        ) : (
          <Image
            source={Images.addphoto}
            style={styles.banner}
            resizeMode="cover"
          />
        )}

        {imgUri ? null : (
          <View style={styles.blackOverlap}>
            <View style={styles.timeView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleUploadFromGallery()}>
                <View style={styles.uploadRecip}>
                  <Image source={Images.gallery} style={styles.gallery} />
                  <View>
                    <Text style={styles.prepare}>Upload Recipe Photo</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Title: My best-ever pea soup"
            style={styles.input}
            value={title}
            placeholderTextColor="#696969"
            onChangeText={text => handleTextChange(text, 'title', 0)}
            onSubmitEditing={() => handleFocusNextInput(serveInputRef)}
          />
        </View>

        <View
          style={styles.halfContain}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: vh(17), fontWeight: '400'}}>Serves:</Text>
          </View>

          <View style={styles.inputContainers}>
            <TextInput
              ref={serveInputRef}
              placeholder="2 people"
              style={styles.inputs}
              value={serve}
              placeholderTextColor="#696969"
              onChangeText={text => handleTextChange(text, 'serve', 0)}
              onSubmitEditing={() => handleFocusNextInput(cookInputRef)}
            />
          </View>
        </View>

        <View
          style={styles.halfContain}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: vh(17), fontWeight: '400'}}>
              Cook Time:
            </Text>
          </View>

          <View style={styles.inputContainers}>
            <TextInput
              ref={cookInputRef}
              placeholder="1 hr 30 mins"
              style={styles.inputs}
              value={cook}
              placeholderTextColor="#696969"
              onChangeText={text => handleTextChange(text, 'cook', 0)}
              onSubmitEditing={() => handleFocusNextInput(ingredientInputRef)}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: vh(25),
            marginHorizontal: vw(20),
          }}>
          <Text style={{fontSize: vh(22), fontWeight: '500'}}>Ingredients</Text>

          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <TextInput
                ref={ingredientInputRef}
                placeholder="100ml water"
                style={styles.input}
                value={ingredient}
                placeholderTextColor="#696969"
                onChangeText={text =>
                  handleTextChange(text, 'ingredient', index)
                }
                onSubmitEditing={() => handleFocusNextInput(healthInputRef)}
              />
            </View>
          ))}

          <View
            style={{
              marginTop: vh(15),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => addNewInputField('ingredient')}>
              <Image
                source={Images.plus}
                style={{height: vh(25), width: vh(25)}}
              />
            </TouchableOpacity>
            <Text
              style={{fontSize: vh(17), fontWeight: '500', marginLeft: vw(10)}}>
              Ingredients
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: vh(25),
            marginHorizontal: vw(20),
          }}>
          <Text style={{fontSize: vh(22), fontWeight: '500'}}>Health</Text>

          {healths.map((health, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <TextInput
                ref={healthInputRef}
                placeholder="Low-Pottasium"
                style={styles.input}
                value={health}
                placeholderTextColor="#696969"
                onChangeText={text => handleTextChange(text, 'health', index)}
                onSubmitEditing={() => handleFocusNextInput(dietInputRef)}
              />
            </View>
          ))}

          <View
            style={{
              marginTop: vh(15),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => addNewInputField('health')}>
              <Image
                source={Images.plus}
                style={{height: vh(25), width: vh(25)}}
              />
            </TouchableOpacity>
            <Text
              style={{fontSize: vh(17), fontWeight: '500', marginLeft: vw(10)}}>
              Healths
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: vh(25),
            marginHorizontal: vw(20),
          }}>
          <Text style={{fontSize: vh(22), fontWeight: '500'}}>Diet</Text>

          {diets.map((diet, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <TextInput
                ref={dietInputRef}
                placeholder="Low Sodium"
                style={styles.input}
                value={diet}
                placeholderTextColor="#696969"
                onChangeText={text => handleTextChange(text, 'diet', index)}
                onSubmitEditing={() => handleFocusNextInput(dishTypeInputRef)}
              />
            </View>
          ))}

          <View
            style={{
              marginTop: vh(15),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => addNewInputField('diet')}>
              <Image
                source={Images.plus}
                style={{height: vh(25), width: vh(25)}}
              />
            </TouchableOpacity>
            <Text
              style={{fontSize: vh(17), fontWeight: '500', marginLeft: vw(10)}}>
              Diet
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: vh(25),
            marginHorizontal: vw(20),
          }}>
          <Text style={{fontSize: vh(22), fontWeight: '500'}}>Dish Type</Text>

          <View style={styles.ingredientContainer}>
            <TextInput
              ref={dishTypeInputRef}
              placeholder="Desserts"
              style={styles.input}
              value={dishType}
              placeholderTextColor="#696969"
              onChangeText={text => handleTextChange(text, 'dishType', 0)}
              onSubmitEditing={() => handleFocusNextInput(mealTypeInputRef)}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: vh(25),
            marginHorizontal: vw(20),
          }}>
          <Text style={{fontSize: vh(22), fontWeight: '500'}}>Meal Type</Text>

          <View style={styles.ingredientContainer}>
            <TextInput
              ref={mealTypeInputRef}
              placeholder="Lunch/Dinner"
              style={styles.input}
              value={mealType}
              placeholderTextColor="#696969"
              onChangeText={text => handleTextChange(text, 'mealType', 0)}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: vh(25),
            marginHorizontal: vw(20),
          }}>
          <Text style={{fontSize: vh(22), fontWeight: '500'}}>Cuisines</Text>

          <View style={styles.ingredientContainer}>
            <TextInput
              ref={cuisinesInputRef}
              placeholder="French"
              style={styles.input}
              value={cuisines}
              placeholderTextColor="#696969"
              onChangeText={text => handleTextChange(text, 'cuisines', 0)}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={styles.touch} onPress={() => handleAddRecipe()}>
            <Text style={styles.text}>ADD RECIPE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  halfContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(20),
    marginTop: vh(20),
  },
  scroll: {
    marginBottom: vh(30),
  },
  gallery: {
    marginRight: vw(7),
    height: vh(26),
    width: vw(26),
  },
  uploadRecip: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    height: 30,
    width: 30,
    marginRight: vw(8),
  },
  header: {
    height: vh(60),
    backgroundColor: colors.main,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
    fontSize: vh(17),
    fontWeight: '500',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  back: {
    height: vh(33),
    width: vw(33),
    marginLeft: vw(10),
  },
  ImageView: {
    width: vw(35),
    height: vh(35),
    borderRadius: 20,

    backgroundColor: '#A9A9A9',

    justifyContent: 'center',
    alignItems: 'center',
  },
  blackOverlap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.7)',
  },
  inputContainer: {
    padding: 10,
    marginHorizontal: vw(20),
    borderRadius: vh(17),
    borderColor: colors.main,
    borderWidth: 2,
    backgroundColor: colors.white,
    marginTop: vh(30),
    opacity: 0.8,
  },
  ingredientContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: vw(10),
    borderRadius: vh(17),
    borderColor: colors.main,
    borderWidth: 2,
    backgroundColor: colors.white,
    marginTop: vh(20),
    opacity: 0.8,
  },
  input: {
    alignItems: 'center',
    padding: 10,
    color: 'black',
    fontSize: vh(15),
  },
  inputs: {
    alignItems: 'center',
    padding: 10,
    color: 'black',
    fontSize: vh(15),
  },
  inputContainers: {
    padding: 10,
    justifyContent: 'center',
    borderColor: colors.main,
    borderWidth: 2,
    borderRadius: vh(17),
    width: vw(200),
    backgroundColor: colors.white,

    opacity: 0.8,
  },
  text: {
    fontSize: vh(15),
    fontWeight: '600',
    color: 'white',
  },

  touch: {
    marginTop: vh(25),
    marginHorizontal: vw(80),
    paddingVertical: vh(12),
    backgroundColor: '#129575',
    borderRadius: vh(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
