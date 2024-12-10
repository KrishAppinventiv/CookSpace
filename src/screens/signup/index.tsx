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
import styles from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigator/types';
import CustomModal from '../../components/CustomModal';

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Signup
>;

const Signup = () => {
  const [Email, SetEmail] = useState<FormFieldState>('');
  const [Name, SetName] = useState<FormFieldState>('');
  const [Password, SetPassword] = useState<FormFieldState>('');
  const [CnfrmPassword, SetCnfrmPassword] = useState<FormFieldState>('');
  const [emailError, setEmailError] = useState<ErrorState>('');
  const [passwordError, setPasswordError] = useState<ErrorState>('');
  const [cnfrmpasswordError, setCnfrmPasswordError] = useState<ErrorState>('');
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState<boolean>(false);
  const nameInputRef = useRef<TextInput | null>(null);
  const emailInputRef = useRef<TextInput | null>(null);
  const confrmpasswordInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  type ErrorState = string;
  type FormFieldState = string;

  const validateEmail = (email: string): boolean => {
    if (!validator.isEmail(email)) {
      setEmailError('Invalid Email format');
      return false;
    } else {
      setEmailError('');
    }

    return true;
  };

  useEffect(() => {
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);
  }, []);

  const validatePassword = (password: string): boolean => {
    if (password.length < 6) {
      setPasswordError('Password should have at least 6 characters');
      return false;
    } else {
      setPasswordError('');
    }
    return true;
  };

  const handleTextChange = (
    text: string,
    field: 'email' | 'password' | 'cnfrmPassword' | 'name',
  ) => {
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

  const validateCnfrmPassword = (cnfrmpassword: string): boolean => {
    if (Password != cnfrmpassword) {
      setCnfrmPasswordError('Password should be match');
      return false;
    } else {
      setCnfrmPasswordError('');
    }
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    const firestore = getFirestore();
    console.log(firestore);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        Email,
        Password,
      );
      setModalMessage('User created successfully');
      setModalVisible(true);

      const user = userCredential.user;
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

        setTimeout(() => {
          navigation.navigate(ScreenNames.Signin);
        }, 2000);
      } else {
        setModalMessage('An error occurred. Please try again.');
        setModalVisible(true);
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setModalMessage(
          'The email address is already in use by another account.',
        );
        setModalVisible(true);
      } else if (error.code === 'auth/invalid-email') {
        setModalMessage('The email address is not valid.');
        setModalVisible(true);
      } else if (error.code === 'auth/weak-password') {
        setModalMessage('Password should be at least 6 characters.');
        setModalVisible(true);
      } else {
        setModalMessage('An error occurred. Please try again.');
        setModalVisible(true);
      }
    }
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
              onChangeText={text => handleTextChange(text, 'name')}
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
              style={emailError ? {borderColor: 'red'} : {}}
            />
          </View>

          <View
            style={[styles.inputContainer, emailError && {borderColor: 'red'}]}>
            <InputField
              ref={emailInputRef}
              placeholder="Email Address"
              value={Email}
              onChangeText={text => handleTextChange(text, 'email')}
              returnKeyType="next"
              onSubmitEditing={() => {
                validateEmail(Email);
                passwordInputRef.current?.focus();
              }}
              style={emailError ? {borderColor: 'red'} : {}}
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
                onChangeText={text => handleTextChange(text, 'password')}
                returnKeyType="next"
                onSubmitEditing={() => {
                  validatePassword(Password);
                  confrmpasswordInputRef.current?.focus();
                }}
                style={passwordError ? {borderColor: 'red'} : {}}
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

            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
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
                onSubmitEditing={() => {
                  if (validateCnfrmPassword(CnfrmPassword)) {
                    handleSubmit();
                  } else {
                    setTimeout(() => {
                      confrmpasswordInputRef.current?.focus();
                    }, 100);
                  }
                }}
                onChangeText={text => handleTextChange(text, 'cnfrmPassword')}
                style={cnfrmpasswordError ? {borderColor: 'red'} : {}}
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
        <View style={styles.already}>
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.Signin)}>
            <Text style={styles.signupColor}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <CustomModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Signup;
