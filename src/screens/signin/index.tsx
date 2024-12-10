import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../assets';
import validator from 'validator';
import {ScreenNames} from '../../navigator/screenNames';
import {firebase} from '../../firebaseConfig';
import styles from './styles';
import {vh} from '../../theme/dimensions';
import Button from '../../components/Button';
import InputField from '../../components/TextInput';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigator/types';
import CustomModal from '../../components/CustomModal';
import Toast from 'react-native-toast-message';

type SigninScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Signin
>;

const Signin = () => {
  const [Email, SetEmail] = useState('');
  const [Emailreset, SetEmailReset] = useState('');
  const [Password, SetPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailresetError, setEmailresetError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [accountError, setAccountError] = useState(false);
  const navigation = useNavigation<SigninScreenNavigationProp>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

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
      emailInputRef.current?.focus();
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

  const handleEmailSubmit = () => {
    setTimeout(() => {
      if (validateEmail(Email)) {
        passwordInputRef.current?.focus();
      }
    }, 100);
  };

  const handleForgotPassword = async () => {
    if (!Emailreset) {
      setEmailError('Please enter your email address');
      return;
    }
    try {
      await firebase.auth().sendPasswordResetEmail(Emailreset);
      setResetPasswordEmailSent(true);
      setModalVisible(false);
      SetEmailReset('')
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Reset email sent successfully!',
        visibilityTime: 3000,
      });
    } catch (error) {
      setEmailresetError('Error sending reset password email');
      console.log(error)
      setTimeout(() => {
        setModalVisible(false)
        SetEmailReset('')
      }, 2000);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Error sending reset password email',
        visibilityTime: 3000,
      });
     
      
      
    }
  };

  const handleSubmit = async () => {
    validatePassword(Password);
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, Password);

      // setModalMessage('User logged in successfully!');
      // setModalVisible(true);
      setTimeout(() => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'User logged in successfully!',
          visibilityTime: 3000,
        });
      }, 500);

      setTimeout(() => {
        navigation.replace(ScreenNames.BottomTab);
      }, 1000);
      
    } catch (error) {
      setModalMessage('User not found. Attempting to sign up...');
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.signupContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.textContain}>
          <Text style={styles.signText}>Hello,</Text>

          <Text style={styles.welText}>Welcome Chef!</Text>
        </View>

        <View style={styles.textInputContain}>
          <View
            style={[styles.inputContainer, emailError && {borderColor: 'red'}]}>
            <InputField
              ref={emailInputRef}
              placeholder="Email Address"
              value={Email}
              onChangeText={text => SetEmail(text.toLowerCase())}
              onSubmitEditing={handleEmailSubmit}
              style={emailError ? {borderColor: 'red'} : {}}
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
          </View>

          <View
            style={[
              styles.inputContainer1,
              passwordError && {borderColor: 'red'},
            ]}>
            <View style={styles.passwordContain}>
              <InputField
                ref={passwordInputRef}
                placeholder="Password"
                value={Password}
                onChangeText={text => SetPassword(text)}
                secureTextEntry={!isPasswordVisible}
                style={passwordError ? {borderColor: 'red'} : {}}
              />
              {passwordError && (
                <Text style={styles.errorText}>{passwordError}</Text>
              )}
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(prev => !prev)}>
                <Image
                  source={isPasswordVisible ? Images.eye : Images.hide}
                  style={styles.img2}
                />
              </TouchableOpacity>
            </View>

            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.forget}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Button onPress={handleSubmit} style={styles.touch} text="Sign In" />

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

        <View style={styles.dontView}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.Signup)}>
            <Text style={styles.signupColor}> Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reset Your Password</Text>
              <Text style={styles.modalText}>
                Enter your email address, and we will send you a link to reset
                your password.
              </Text>

              <InputField
                placeholder="Email Address"
                value={Emailreset}
                onChangeText={text => SetEmailReset(text.toLowerCase())}
                style={emailresetError ? {borderColor: 'red'} : {}}
              />
              {emailresetError && (
                <Text style={styles.errorText}>{emailresetError}</Text>
              )}
              <Button
                onPress={handleForgotPassword}
                text="Send Reset Link"
                style={styles.resetButton}
              />
              <Button
                onPress={() => setModalVisible(false)}
                text="Cancel"
                style={styles.cancelButton}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>

      <CustomModal
        visible={modalVisible1}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

export default Signin;
