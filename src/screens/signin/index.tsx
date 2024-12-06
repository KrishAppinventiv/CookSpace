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
  Alert,
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

const Signin = () => {
  const [Email, SetEmail] = useState('');
  const [Password, SetPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [accountError, setAccountError] = useState(false);
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState(false);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const validateEmail = email => {
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

  const validatePassword = password => {
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
    if (!Email) {
      setEmailError('Please enter your email address');
      return;
    }
    try {
      await firebase.auth().sendPasswordResetEmail(Email);
     Alert.alert('Password reset email sent!');
      setResetPasswordEmailSent(true);
      setModalVisible(false);
    } catch (error) {
      console.log('Error sending reset email:', error);
      setEmailError('Error sending reset password email');
    }
  };

  const handleSubmit = async () => {
    validatePassword(Password);
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, Password);
      console.log('User logged in successfully!');
      navigation.replace(ScreenNames.BottomTab);
    } catch (error) {
      Alert.alert('User not found. Attempting to sign up...');
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
       
        <Button onPress={handleSubmit} style={styles.touch}text="Sign In" />

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
              value={Email}
              onChangeText={(text) => SetEmail(text.toLowerCase())}
              style={emailError ? { borderColor: 'red' } : {}}
            />
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            <Button onPress={handleForgotPassword} text="Send Reset Link" style={styles.resetButton} />
            <Button
              onPress={() => setModalVisible(false)}
              text="Cancel"
              style={styles.cancelButton}
            />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
