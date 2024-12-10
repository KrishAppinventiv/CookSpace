import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Images} from '../../assets';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../theme/dimensions';
import {colors} from '../../theme';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {ScreenNames} from '../../navigator/screenNames';
import {getFirestore} from '@react-native-firebase/firestore';
import {getAuth, signOut} from '@react-native-firebase/auth';
import styles from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigator/types';
import CustomModal from '../../components/CustomModal';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Profile
>;

const Profile = () => {
  const navigation: any = useNavigation<ProfileScreenNavigationProp>();
  const [selectedTab, setSelectedTab] = useState('Recipe');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgUri, SetImgUri] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState('');
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const renderItem = ({item}) => {
    return (
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
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleOptionSelect = async option => {
    setTooltipVisible(false);
    switch (option) {
      case 'Logout':
        try {
          await signOut(getAuth());
          navigation.replace(ScreenNames.Signin);
        } catch (error) {}
        break;

      default:
        break;
    }
  };
  const handleUploadFromGallery = async () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const imageUri = response.assets[0].uri;

        const filename = imageUri.split('/').pop();

        const userId = getAuth().currentUser?.uid;

        if (userId) {
          try {
            await getFirestore().collection('users').doc(userId).update({
              profilePic: imageUri,
            });

            setModalMessage('Image upload successfully!');
            setModalVisible(true);

            setUrl(imageUri);
            SetImgUri(true);
          } catch (error) {}
        } else {
        }
      }
    });
  };
  useEffect(() => {
    const userId = getAuth().currentUser?.uid;
    if (!userId) {
      return;
    }

    const unsubscribe = getFirestore()
      .collection('users')
      .doc(userId)
      .onSnapshot(userDoc => {
        const profilePic = userDoc.data()?.profilePic || '';
        const name = userDoc.data()?.name || '';
        const postData = userDoc.data()?.postData || [];
        setUserProfilePic(profilePic);
        setName(name);
        setRecipes(postData);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'flex-end', marginEnd: 20}}>
        <TouchableOpacity onPress={() => setTooltipVisible(true)}>
          <Image source={Images.more} style={styles.back} />
        </TouchableOpacity>
      </View>
      <View style={styles.head}>
        <Text style={styles.heading}>Profile</Text>
      </View>
      <View style={styles.upperProfile}>
        <View style={styles.profileView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleUploadFromGallery()}>
            {imgUri || userProfilePic ? (
              <Image
                source={{uri: userProfilePic}}
                style={styles.profileImg}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={Images.dp}
                style={{width: vh(99), height: vh(99), borderRadius: vh(50)}}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.statusView}>
          <View>
            <Text style={styles.statusText}>Recipe</Text>
            <Text style={styles.status}>4</Text>
          </View>
          <View>
            <Text style={styles.statusText}>Followers</Text>
            <Text style={styles.status}>2.5M</Text>
          </View>
          <View>
            <Text style={styles.statusText}>Following</Text>
            <Text style={styles.status}>259</Text>
          </View>
        </View>
      </View>

      <View style={styles.informView}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.chefText}>Chef</Text>
        <Text style={styles.describe}>Private Chef</Text>
        <Text style={styles.decribe}>
          Passionate about food and life 🥘🍲🍝🍱
        </Text>
        <Text style={styles.moreText}>More..</Text>
      </View>

      <View style={[styles.category]}>
        <TouchableOpacity
          style={[
            styles.selected,
            {
              backgroundColor:
                selectedTab == 'Recipe' ? colors.main : colors.white,
            },
          ]}
          onPress={() => {
            setSelectedTab('Recipe');
          }}>
          <Text
            style={{
              color: selectedTab == 'Recipe' ? 'white' : '#71B1A1',
              fontWeight: '800',
              fontSize: selectedTab == 'Recipe' ? 14 : 16,
            }}>
            Recipe
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selected,
            {
              backgroundColor:
                selectedTab == 'Video' ? colors.main : colors.white,
            },
          ]}
          onPress={() => {
            setSelectedTab('Video');
          }}>
          <Text
            style={{
              color: selectedTab == 'Video' ? 'white' : '#71B1A1',
              fontWeight: '800',
              fontSize: selectedTab == 'Video' ? 14 : 16,
            }}>
            Video
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.selected,
            {
              backgroundColor:
                selectedTab == 'Tags' ? colors.main : colors.white,
            },
          ]}
          onPress={() => {
            setSelectedTab('Tags');
          }}>
          <Text
            style={{
              color: selectedTab == 'Tags' ? 'white' : '#71B1A1',
              fontWeight: '800',
              fontSize: selectedTab == 'Tags' ? 14 : 16,
            }}>
            Tags
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTab == 'Recipe' && (
        <View style={styles.recipes}>
          {recipes.length == 0 ? (
            <View style={styles.flatView}>
              <Image source={Images.serving} style={styles.serveView} />
              <Text style={styles.norecipeText}>No Recipes Yet..</Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={recipes}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      )}

      {isTooltipVisible && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isTooltipVisible}
          onRequestClose={() => setTooltipVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setTooltipVisible(false)}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>

          <View style={styles.tooltipContainer}>
            <TouchableOpacity
              style={styles.tooltipItem}
              onPress={() => handleOptionSelect('Share')}>
              <Image source={Images.share} style={styles.shareIcon} />
              <Text style={styles.tooltipText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tooltipItem}
              onPress={() => handleOptionSelect('Privacy')}>
              <Image source={Images.privacy} style={styles.modalIcon} />
              <Text style={styles.tooltipText}>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tooltipItem}
              onPress={() => handleOptionSelect('Diactivate')}>
              <Image source={Images.delete} style={styles.modalIcon} />
              <Text style={styles.tooltipText}>Diactivate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tooltipItem}
              onPress={() => handleOptionSelect('Logout')}>
              <Image source={Images.logout} style={styles.modalIcon} />
              <Text style={styles.tooltipText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Profile;
