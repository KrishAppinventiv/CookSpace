import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    SafeAreaView,
    Modal
  } from 'react-native';
  import React, {useEffect, useRef, useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import {Images} from '../../assets';
  import validator from 'validator';
  import {ScreenNames} from '../../navigator/screenNames';
  import {firebase} from '../../firebaseConfig';
  import styles from './styles';
  import {vh} from '../../theme/dimensions';

  
  
  
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
      
      emailInputRef.current?.focus();
      
  
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
  
    const handleTextChange = (text, field) => {
      if (field === 'email') {
          SetEmail(text.toLowerCase());
      //   validateEmail(text);
      } else if (field === 'password') {
        SetPassword(text);
       
      }
    };


    const handleForgotPassword = async () => {
      if (!Email) {
        setEmailError('Please enter your email address');
        return;
      }
  
      try {
        await firebase.auth().sendPasswordResetEmail(Email);
        console.log('Password reset email sent!');
        setResetPasswordEmailSent(true); 
        setModalVisible(false); 
      } catch (error) {
        console.log('Error sending reset email:', error);
        setEmailError('Error sending reset password email');
      }
    };
  
  
  
   
  
    const handleSubmit = async () => {
      // const isEmailValid = validateEmail(Email);
      // const isPasswordValid = validatePassword(Password);
      // if (!isEmailValid || !isPasswordValid) {
      //     setAccountError(true);
      //     navigation.navigate(ScreenNames.Signup)
      //     return;
      // }
  
      // setAccountError(false);
     validatePassword(Password);
      try {
        // Try signing in first
        await firebase.auth().signInWithEmailAndPassword(Email, Password);
        console.log('User logged in successfully!');
        navigation.navigate(ScreenNames.BottomTab);
      } catch (error) {
        console.log('User not found. Attempting to sign up...');
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <View style={styles.textContain}>
            <Text style={styles.signText}>Hello,</Text>
  
            <Text style={styles.welText}>Welcome Back!</Text>
          </View>
  
          <View style={styles.textInputContain}>
            <View
              style={[styles.inputContainer, emailError && {borderColor: 'red'}]}>
              <TextInput
                ref={emailInputRef}
                placeholder="Email Address"
                style={styles.input}
                value={Email}
                onChangeText={text => handleTextChange(text, 'email')}
                autoFocus={true} 
                onSubmitEditing={handleEmailSubmit}
                returnKeyType="next" 
              />
  
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>
  
            <View
              style={[
                styles.inputContainer1,
                passwordError && {borderColor: 'red'},
              ]}>
              <View style={styles.passwordContain}>
                <TextInput
                  ref={passwordInputRef}
                  placeholder="Password"
                  style={styles.input}
                  value={Password}
                  onChangeText={text => handleTextChange(text, 'password')}
                   autoFocus={true} 
                   autoCapitalize="none"
                   secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(prev => !prev)}>
                  <Image source={isPasswordVisible?Images.eye:Images.hide} style={styles.img2} />
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
          <View style={styles.touchContain}>
            <TouchableOpacity style={styles.touch} onPress={handleSubmit}>
              <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>
          </View>
  
          <View style={styles.footerContain}>
            <View style={styles.footerView}></View>
            <Text style={styles.option}>Or</Text>
            <View style={styles.footerView}></View>
          </View>
  
          <View style={styles.otherOption}>
            <TouchableOpacity activeOpacity={0.6} >
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
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Reset Your Password</Text>
              <Text style={styles.modalText}>
                Enter your email address, and we will send you a link to reset your password.
              </Text>

              <TextInput
                style={[styles.input, styles.modalInput]}
                placeholder="Email Address"
                value={Email}
                onChangeText={text => handleTextChange(text, 'email')}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleForgotPassword}
              >
                <Text style={styles.resetButtonText}>Send Reset Link</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </View>
      </SafeAreaView>
    );
  };
  
  export default Signin;
 