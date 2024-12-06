import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {vh, vw} from '../../theme/dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme';
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from '@react-native-firebase/firestore';
import {getAuth} from '@react-native-firebase/auth';
import {ScreenNames} from '../../navigator/screenNames';
import Button from '../../components/Button';
import InputField from '../../components/TextInput';
import AddInputFieldButton from '../../components/AddInputFieldButton';
import styles from './styles';


const db = getFirestore();
interface RecipeData {
  label: string;
  serve: string;
  cook: string;
  ingredientLines: string[];
  healthLabels: string[];
  dietLabels: string[];
  dishType: string[];
  mealType: string[];
  cautions: string[];
  cuisineType: string[];
  image: string;
}

const Add = () => {
  const navigation = useNavigation();
  const [imgUri, SetImgUri] = useState(false);
  const [cook, setCook] = useState('');
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');
  const [serve, setServe] = useState('');
  const [ingredientLines, setIngredients] = useState<string[]>(['']);
  const [healthLabels, setHealths] = useState<string[]>(['']);
  const [dietLabels, setDiets] = useState<string[]>(['']);
  const [dishType, setDishType] = useState<string[]>(['']);
  const [cautions, setCautions] = useState<string[]>(['']);
  const [mealType, setMealType] = useState<string[]>(['']);
  const [cuisineType, setCuisines] = useState<string[]>(['']);
  const serveInputRef = useRef<TextInput>(null);
  const cookInputRef = useRef<TextInput>(null);
  const ingredientInputRef = useRef<TextInput>(null);
  const healthInputRef = useRef<TextInput>(null);
  const dietInputRef = useRef<TextInput>(null);
  const dishTypeInputRef = useRef<TextInput>(null);
  const cautionInputRef = useRef<TextInput>(null);
  const mealTypeInputRef = useRef<TextInput>(null);
  const cuisinesInputRef = useRef<TextInput>(null);
  const handleUploadFromGallery = async () => {
    launchImageLibrary({mediaType: 'photo'}, async (response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.assets?.[0]?.uri;
        if (imageUri) {
          console.log('Image URI: ', imageUri);
          setUrl(imageUri);
          SetImgUri(true);
        }
      }
    });
  };
  const collectRecipeData = () => {

    if (!label || !serve || !cook || ingredientLines.some(ingredient => ingredient.trim() === '') || !imgUri) {
      
      Alert.alert('All fields must be filled, and an image must be selected.');
      return;
    }
    const recipeData = {
      recipe: {
        label,
        serve,
        cook,
        ingredientLines,
        healthLabels,
        dietLabels,
        dishType,
        mealType,
        cautions,
        cuisineType,
        image: url,
      },
    };

    return recipeData;
  };

  const handleTextChange = (text: string, field: string, index: number) => {
    if (field === 'title') {
      setLabel(text);
    } else if (field === 'serve') {
      setServe(text);
    } else if (field === 'cook') {
      setCook(text);
    } else if (field === 'ingredient') {
      const updatedIngredients = [...ingredientLines];
      updatedIngredients[index] = text;
      setIngredients(updatedIngredients);
    } else if (field === 'diet') {
      const updatedDiets = [...dietLabels];
      updatedDiets[index] = text;
      setDiets(updatedDiets);
    } else if (field === 'mealType') {
      const updateMeal = [...mealType];
      updateMeal[index] = text;
      setMealType(updateMeal);
    } else if (field === 'dishType') {
      const updatedDish = [...dishType];
      updatedDish[index] = text;
      setDishType(updatedDish);
    } else if (field === 'health') {
      const updatedHealths = [...healthLabels];
      updatedHealths[index] = text;
      setHealths(updatedHealths);
    } else if (field === 'cuisines') {
      const updatedCuisines = [...cuisineType];
      updatedCuisines[index] = text;
      setCuisines(updatedCuisines);
    } else if (field === 'caution') {
      const updatedCautions = [...cautions];
      updatedCautions[index] = text;
      setCautions(updatedCautions);
    }
  };

  const handleAddRecipe = async () => {
    const recipeData = collectRecipeData();

    const userId = getAuth().currentUser?.uid;
    if (userId) {
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
        setLabel('');
        setServe('');
        setUrl('');
        setDishType(['']);
        setMealType(['']);
        setCuisines(['']);
        setHealths(['']);
        setDiets(['']);
        setIngredients(['']);
        setCautions(['']);
        SetImgUri(false);
        navigation.navigate(ScreenNames.Profile);
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

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            setCook('');
            setLabel('');
            setServe('');
            setUrl('');
            setDishType(['']);
            setMealType(['']);
            setCuisines(['']);
            setHealths(['']);
            setDiets(['']);
            setIngredients(['']);
            SetImgUri(false);
          }}>
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
          <InputField
            value={label}
            placeholder="Title: My best-ever pea soup"
            onChangeText={text => handleTextChange(text, 'title', 0)}
            style={styles.input}
            onSubmitEditing={() => handleFocusNextInput(serveInputRef)}
          />
        </View>

        <View style={styles.halfContain}>
          <View style={styles.middle}>
            <Text style={styles.halfText}>Serves:</Text>
          </View>

          <View style={styles.inputContainers}>
            <InputField
              value={serve}
              placeholder="2 people"
              onChangeText={text => handleTextChange(text, 'serve', 0)}
              style={styles.inputs}
              onSubmitEditing={() => handleFocusNextInput(cookInputRef)}
              ref={cookInputRef}
            />
          </View>
        </View>

        <View style={styles.halfContain}>
          <View style={styles.middle}>
            <Text style={styles.halfText}>Cook Time:</Text>
          </View>

          <View style={styles.inputContainers}>
            <InputField
              value={cook}
              placeholder="1 hr 30 mins"
              onChangeText={text => handleTextChange(text, 'cook', 0)}
              style={styles.inputs}
              ref={cookInputRef}
              onSubmitEditing={() => handleFocusNextInput(ingredientInputRef)}
            />
          </View>
        </View>
        <View style={styles.detail}>
          <Text style={styles.recipedesc}>Ingredients</Text>

          {ingredientLines.map((ingredient, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <InputField
                key={index}
                value={ingredient}
                placeholder="100ml water"
                onChangeText={text =>
                  handleTextChange(text, 'ingredient', index)
                }
                style={styles.input}
                ref={ingredientInputRef}
                onSubmitEditing={() => handleFocusNextInput(healthInputRef)}
              />
            </View>
          ))}

          <AddInputFieldButton
            onPress={() => setIngredients([...ingredientLines, ''])}
            label="Add Ingredient"
          />
        </View>

        <View style={styles.detail}>
          <Text style={styles.recipedesc}>Health</Text>

          {healthLabels.map((health, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <InputField
                key={index}
                value={health}
                placeholder="Low-Pottasium"
                onChangeText={text => handleTextChange(text, 'health', index)}
                style={styles.input}
                ref={healthInputRef}
                onSubmitEditing={() => handleFocusNextInput(cautionInputRef)}
              />
            </View>
          ))}

          <AddInputFieldButton
            onPress={() => setHealths([...healthLabels, ''])}
            label="Add Health"
          />
        </View>

        <View style={styles.detail}>
          <Text style={styles.recipedesc}>Cautions</Text>

          {cautions.map((caution, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <InputField
                key={index}
                value={caution}
                placeholder="Low Sodium"
                onChangeText={text => handleTextChange(text, 'caution', index)}
                style={styles.input}
                ref={dietInputRef}
                onSubmitEditing={() => handleFocusNextInput(dietInputRef)}
              />
            </View>
          ))}

          <AddInputFieldButton
            onPress={() => setCautions([...cautions, ''])}
            label="Add Caution"
          />
        </View>

        <View style={styles.detail}>
          <Text style={styles.recipedesc}>Diet</Text>

          {dietLabels.map((diet, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <InputField
                key={index}
                value={diet}
                placeholder="Low Sodium"
                onChangeText={text => handleTextChange(text, 'diet', index)}
                style={styles.input}
                ref={dietInputRef}
                onSubmitEditing={() => handleFocusNextInput(dishTypeInputRef)}
              />
            </View>
          ))}

          <AddInputFieldButton
            onPress={() => setDiets([...dietLabels, ''])}
            label="Add Diet"
          />
        </View>

        <View style={styles.detail}>
          <Text style={styles.recipedesc}>Dish Type</Text>

          {dishType.map((dish, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <InputField
                key={index}
                value={dish}
                placeholder="Desserts"
                onChangeText={text => handleTextChange(text, 'dishType', index)}
                style={styles.input}
                ref={dishTypeInputRef}
                onSubmitEditing={() => handleFocusNextInput(mealTypeInputRef)}
              />
            </View>
          ))}
        </View>

        <View style={styles.detail}>
          <Text style={styles.recipedesc}>Meal Type</Text>

          {mealType.map((meal, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <InputField
                key={index}
                value={meal}
                placeholder="Lunch/Dinner"
                onChangeText={text => handleTextChange(text, 'mealType', index)}
                style={styles.input}
                ref={mealTypeInputRef}
              />
            </View>
          ))}
        </View>

        <View style={styles.detail}>
          <Text style={styles.recipedesc}>Cuisines</Text>

          {cuisineType.map((cuisine, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <InputField
                key={index}
                value={cuisine}
                placeholder="French"
                onChangeText={text => handleTextChange(text, 'cuisines', index)}
                style={styles.input}
                ref={cuisinesInputRef}
              />
            </View>
          ))}
        </View>

        <View>
          <Button onPress={() => handleAddRecipe()} text="Add Recipe" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Add;


//   addIconText: {
//     fontSize: vh(17),
//     fontWeight: '500',
//     marginLeft: vw(10),
//   },
//   addicon: {
//     height: vh(25),
//     width: vh(25),
//   },
//   add: {
//     marginTop: vh(15),
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   recipedesc: {
//     fontSize: vh(22),
//     fontWeight: '500',
//   },
//   detail: {
//     marginTop: vh(25),
//     marginHorizontal: vw(20),
//   },
//   halfText: {
//     fontSize: vh(17),
//     fontWeight: '400',
//   },
//   middle: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   halfContain: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: vw(20),
//     marginTop: vh(20),
//   },
//   scroll: {},
//   gallery: {
//     marginRight: vw(7),
//     height: vh(26),
//     width: vw(26),
//   },
//   uploadRecip: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   options: {
//     height: 30,
//     width: 30,
//     marginRight: vw(8),
//   },
//   header: {
//     height: vh(60),
//     backgroundColor: colors.main,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   headDish: {
//     width: '100%',
//     height: '38%',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   banner: {
//     width: '100%',
//     height: '100%',
//   },
//   saveView: {
//     height: 33,
//     width: 33,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     borderRadius: 18,
//   },
//   save: {
//     height: 23,
//     width: 23,
//     alignSelf: 'center',
//   },
//   prepare: {
//     color: 'white',
//     fontSize: vh(17),
//     fontWeight: '500',
//     marginRight: 10,
//   },
//   timer: {
//     height: 22,
//     width: 22,
//     marginRight: 5,
//   },
//   minView: {
//     flexDirection: 'row',
//     marginTop: 5,
//   },
//   timeView: {
//     bottom: 7,
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     alignSelf: 'center',
//   },
//   back: {
//     height: vh(33),
//     width: vw(33),
//     marginLeft: vw(10),
//   },
//   ImageView: {
//     width: vw(35),
//     height: vh(35),
//     borderRadius: 20,

//     backgroundColor: '#A9A9A9',

//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   blackOverlap: {
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//     backgroundColor: 'rgba(0,0,0,.7)',
//   },
//   inputContainer: {
//     padding: 10,
//     marginHorizontal: vw(20),
//     borderRadius: vh(17),
//     borderColor: colors.main,
//     borderWidth: 2,
//     backgroundColor: colors.white,
//     marginTop: vh(30),
//     opacity: 0.8,
//   },
//   ingredientContainer: {
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginHorizontal: vw(10),
//     borderRadius: vh(17),
//     borderColor: colors.main,
//     borderWidth: 2,
//     backgroundColor: colors.white,
//     marginTop: vh(20),
//     opacity: 0.8,
//   },
//   input: {
//     alignItems: 'center',
//     padding: 10,
//     color: 'black',
//     fontSize: vh(15),
//   },
//   inputs: {
//     alignItems: 'center',
//     padding: 10,
//     color: 'black',
//     fontSize: vh(15),
//   },
//   inputContainers: {
//     padding: 10,
//     justifyContent: 'center',
//     borderColor: colors.main,
//     borderWidth: 2,
//     borderRadius: vh(17),
//     width: vw(200),
//     backgroundColor: colors.white,

//     opacity: 0.8,
//   },
//   text: {
//     fontSize: vh(15),
//     fontWeight: '600',
//     color: 'white',
//   },

//   touch: {
//     marginTop: vh(25),
//     marginHorizontal: vw(80),
//     paddingVertical: vh(12),
//     backgroundColor: '#129575',
//     borderRadius: vh(30),
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
