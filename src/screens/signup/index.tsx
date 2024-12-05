import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets';
import validator from 'validator';
import {ScreenNames} from '../../navigator/screenNames';
import auth from '@react-native-firebase/auth';
import {getFirestore, FieldValue} from '@react-native-firebase/firestore';
import {vh, vw} from '../../theme/dimensions';
import InputField from '../../components/TextInput';

const Signup = () => {
  const [Email, SetEmail] = useState('');
  const [Name, SetName] = useState('');
  const [Password, SetPassword] = useState('');
  const [CnfrmPassword, SetCnfrmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cnfrmpasswordError, setCnfrmPasswordError] = useState('');
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const confrmpasswordInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const validateEmail = email => {
    if (!validator.isEmail(email)) {
      setEmailError('Invalid Email format');
      return false;
    } else {
      setEmailError('');
    }
    if (email !== 'Krishcs279@gmail.com') {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setTimeout(() => {
        nameInputRef.current?.focus();
    }, 100);
  }, []);

  const validatePassword = password => {
    if (password.length < 6) {
      setPasswordError('Password should have at least 6 characters');
      return false;
    } else {
      setPasswordError('');
    }
    return true;
  };

  const handleTextChange = (text, field) => {
    if (field === 'email') {
      SetEmail(text.toLowerCase());
      
    } else if (field === 'password') {
      SetPassword(text);
      
    } else if (field === 'cnfrmPassword') {
      SetCnfrmPassword(text);
    } else if (field === 'name') {
      SetName(text);
    }
  };

  const validateCnfrmPassword = cnfrmpassword => {
          if(Password!=cnfrmpassword){
            setCnfrmPasswordError('Password should be match')
            return false;
          }else{
            setCnfrmPasswordError('')
          }
          return true;
  };

  const handleSubmit = async () => {
    const firestore = getFirestore();
    console.log(firestore);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        Email,
        Password,
      );
      console.log('User created successfully');

      const user = userCredential.user;
      console.log('Saving user data to Firestore...');

      const userDocRef = firestore.collection('users').doc(user.uid);
      console.log(userDocRef);

      if (userDocRef && typeof userDocRef.set === 'function') {
        await userDocRef.set({
          name: Name,
          email: Email,
          profilePic: '',
          createdAt: FieldValue.serverTimestamp(),
          dateofbirth: '',
          savedItem: [],
          PostItem: [],
        });
        console.log('User data saved to Firestore successfully!');
        navigation.navigate(ScreenNames.Signin); 
      } else {
        Alert.alert(
          'There was an error saving your data. Please try again later.',
        );
      }
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);

      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('The email address is already in use by another account.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('The email address is not valid.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Password should be at least 6 characters.');
      } else {
        Alert.alert('An error occurred. Please try again.');
      }
    }
  };

  const handleNextFocus = (nextInputRef) => {
    nextInputRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.signupContainer}>
        <View style={styles.textContain}>
          <Text style={styles.signText}>Create an Account</Text>

          <Text style={styles.welText}>
            Let’s help you set up your account, it won’t take long.
          </Text>
        </View>

        <View style={styles.textInputContain}>
          <View style={styles.inputContainer}>
          <InputField
            ref={nameInputRef}
            placeholder="Name"
            value={Name}
            onChangeText={(text) => handleTextChange(text, 'name')}
            returnKeyType="next"
            onSubmitEditing={()=> {

                emailInputRef.current.focus()
            }}
            style={emailError ? { borderColor: 'red' } : {}}
          />
          </View>

          <View
            style={[styles.inputContainer, emailError && {borderColor: 'red'}]}>
              <InputField
            ref={emailInputRef}
            placeholder="Email Address"
            value={Email}
            onChangeText={(text) => handleTextChange(text, 'email')}
            returnKeyType="next"
            onSubmitEditing={()=> {
                    validateEmail(Email)
                    passwordInputRef.current?.focus();
                  
            }}
            style={emailError ? { borderColor: 'red' } : {}}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          </View>

          <View
            style={[
              styles.inputContainer,
              passwordError && {borderColor: 'red'},
            ]}>
            <View style={styles.passwordContain}>
            <InputField
            ref={passwordInputRef}
            placeholder="Password"
            value={Password}
            onChangeText={(text) => handleTextChange(text, 'password')}
            returnKeyType="next"
            onSubmitEditing={()=> {
                validatePassword(Password)
                confrmpasswordInputRef.current?.focus();
              
        }}
            style={passwordError ? { borderColor: 'red' } : {}}
            secureTextEntry={!isPasswordVisible}
          />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(prev => !prev)}>
                <Image
                  source={isPasswordVisible ? Images.eye : Images.hide}
                  style={styles.img2}
                />
              </TouchableOpacity>
            </View>

            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
          </View>

          <View
            style={[
              styles.inputContainer1,
              cnfrmpasswordError && {borderColor: 'red'},
            ]}>
            <View style={styles.passwordContain}>
            <InputField
            ref={confrmpasswordInputRef}
            placeholder="Confirm Password"
            value={CnfrmPassword}
            onSubmitEditing={() =>{
                if(validateCnfrmPassword(CnfrmPassword)){
                    handleSubmit()
                }else{
                    setTimeout(() => {
                        confrmpasswordInputRef.current?.focus();
                    }, 100);    
                }
                }}
            onChangeText={(text) => handleTextChange(text, 'cnfrmPassword')}
            style={cnfrmpasswordError ? { borderColor: 'red' } : {}}
            secureTextEntry={!isPasswordVisible2}
          />
             <TouchableOpacity
                onPress={() => setIsPasswordVisible2(prev => !prev)}>
                <Image
                  source={isPasswordVisible2 ? Images.eye : Images.hide}
                  style={styles.img2}
                />
              </TouchableOpacity>
            </View>

            {cnfrmpasswordError && (
            <Text style={styles.errorText}>{cnfrmpasswordError}</Text>
          )}
          </View>
        </View>

       
        <View style={styles.touchContain}>
          <TouchableOpacity style={styles.touch} onPress={handleSubmit}>
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>

<View style={styles.footerContain}>
          <View style={styles.footerView}></View>
          <Text style={styles.option}>Or</Text>
          <View style={styles.footerView}></View>
        </View>

        <View style={styles.otherOption}>
          <TouchableOpacity activeOpacity={0.6}>
            <View style={styles.googleView}>
              <Image source={Images.google} style={styles.google} />
              <Text style={{fontSize: vh(15)}}>Sign in with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={styles.already}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.Signin)}>
            <Text style={styles.signupColor}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  already: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vh(30),
  },
  signupColor: {
    color: '#FF9C00',
  },
  
  gap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vh(30),
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  img: {
    marginTop: 20,
    height: 42,
    width: 120,
  },
  imageContain: {
    marginTop: 10,
    marginStart: 30,
    marginBottom: 40,
  },
  signText: {
    color: '#000000',
    fontSize: 30,
    fontWeight: '700',
  },

  welText: {
    color: '#000000',
    fontSize: vh(12),
    fontWeight: '400',
    fontFamily: 'Poppins',
    marginStart:vw(3)
  },
  blurBackground: {
    opacity: 0.6,
  },
  textContain: {
    marginTop: vh(30),
    marginHorizontal:vw(20)
  },
  greyText: {
    color: 'grey',
    marginTop: 10,
    width: 270,
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    alignItems: 'center',
    padding: 10,
    color: 'black',
  },
  inputContainer: {
    padding: 10,
    width: vw(325),
    borderRadius: 7,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: vh(25),
  },

  inputContainer1: {
    padding: 10,
    width: vw(325),
    borderRadius: 7,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
  },

  textInputContain: {
    marginHorizontal: vw(20),
    marginTop: 40,
    alignItems: 'center',
  },
  touch: {
    marginTop: 15,
    paddingHorizontal: 130,
    paddingVertical: 20,
    backgroundColor: '#129575',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  touchContain: {
    marginTop:vh(20),
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  img2: {
    height: 16,
    width: 16,
    marginEnd: 10,
    alignItems: 'center',
  },
  passwordContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  signupContainer: {
    flex: 1,
    marginTop: vh(10),
    paddingBottom: vh(40),
    marginBottom: vh(10),
  },
  errorContain: {
    height: 65,
    width: 350,
    borderRadius: 7,
    marginStart: 35,
    backgroundColor: '#ffe8e7',

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  redText: {
    color: 'black',
    padding: 10,
    fontSize: 13,
    fontWeight: '400',
  },
  forget: {
    marginStart: 39,
    marginTop: 25,
    marginBottom: 25,
  },
  forgetText: {
    color: '#FFAD30',
    fontWeight: '600',
  },

  content: {
    marginStart: 50,
    marginTop: 20,
  },

  instructionText: {
    paddingHorizontal: 12,
    color: 'grey',
    fontSize: 12,
  },
  instruction: {
    marginTop: 17,
    marginBottom: 10,
  },
  google: {
    height: vh(28),
    width: vw(28),
    marginRight: vw(6),
  },
  googleView: {
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#C3C3C3',
    shadowOpacity: 5,
    shadowRadius: 3,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  otherOption: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vh(30),
  },

  option: {
    marginHorizontal: 10,
    color: '#c7c7c7',
  },
  footerView: {
    height: 1,
    width: 30,
    backgroundColor: '#c7c7c7',
    alignSelf: 'center',
  },
  footerContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vh(30),
  },
});
