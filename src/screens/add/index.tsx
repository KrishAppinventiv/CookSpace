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
import React, {useState} from 'react';
import {Images} from '../../assets';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {vh, vw} from '../../theme/dimensions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme';

const Add = () => {
  const navigation = useNavigation();
  const [imgUri, SetImgUri] = useState(false);
  const [cook, setCook] = useState('');
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [serve, setServe] = useState('');

  const [ingredients, setIngredients] = useState('');

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

  const handleTextChange = (text, field) => {
    if (field === 'title') {
      setTitle(text);
    } else if (field === 'serve') {
      setServe(text);
    } else if (field === 'cook') {
      setCook(text);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          height: vh(60),
          backgroundColor: '#808080',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.cancel} style={styles.back} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTooltipVisible(true)}>
          <Image
            source={Images.options}
            style={{
              height: 30,
              width: 30,
              marginRight: vw(8),
            }}
          />
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
        {/* <Image
          source={Images.addphoto}
          style={styles.banner}
          resizeMode="cover"
        /> */}
        {imgUri ? null : (
          <View style={styles.blackOverlap}>
            <View style={styles.timeView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleUploadFromGallery()}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={Images.gallery}
                    style={{marginRight: vw(7), height: vh(26), width: vw(26)}}
                  />
                  <View>
                    <Text style={styles.prepare}>Upload Recipe Photo</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <ScrollView style={{ paddingBottom:vh(20)}}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Title: My best-ever pea soup"
            style={styles.input}
            value={title}
            placeholderTextColor="#696969"
            onChangeText={text => handleTextChange(text, 'title')}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: vw(20),
            marginTop: vh(20),
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: vh(17), fontWeight: '400'}}>Serves:</Text>
          </View>
          
          <View style={styles.inputContainers}>
            <TextInput
              placeholder="2 people"
              style={styles.inputs}
              value={serve}
              placeholderTextColor="#696969"
              onChangeText={text => handleTextChange(text, 'serve')}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: vw(20),
            marginTop: vh(20),
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: vh(17), fontWeight: '400'}}>
              Cook Time:
            </Text>
          </View>

          <View style={styles.inputContainers}>
            <TextInput
              placeholder="1 hr 30 mins"
              style={styles.inputs}
              value={cook}
              placeholderTextColor="#696969"
              onChangeText={text => handleTextChange(text, 'cook')}
            />
          </View>
        </View>
        <View
        style={{
          
          marginTop: vh(25),
          marginHorizontal: vw(20),
        }}>
        <Text style={{fontSize: vh(22), fontWeight: '500'}}>Ingredients</Text>

        <View style={styles.ingredientContainer}>
          <TextInput
            placeholder="100ml water"
            style={styles.input}
            value={ingredients}
            placeholderTextColor="#696969"
            onChangeText={text => handleTextChange(text, 'ingredient')}
          />
        </View>

        <View style={styles.ingredientContainer}>
          <TextInput
            placeholder="250gm flour"
            style={styles.input}
            value={ingredients}
            placeholderTextColor="#696969"
            onChangeText={text => handleTextChange(text, 'ingredient')}
          />
        </View>
      </View>
      </ScrollView>
   
     
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
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
    paddingVertical:5,
    paddingHorizontal: 10,
    marginHorizontal: vw(20),
    borderRadius: vh(17),
    borderColor: colors.main,
    borderWidth: 2,
    backgroundColor: colors.white,
    marginTop:vh(20),
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
});
