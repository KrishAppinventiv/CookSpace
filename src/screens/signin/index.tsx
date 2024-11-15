import { StyleSheet, Text, TouchableOpacity, View,TextInput ,Image} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import validator from 'validator';
import { ScreenNames } from '../../navigator/screenNames';
import { firebase } from '../../firebaseConfig';
import styles from './styles';


const Signin = () => {


   
    const [Email, SetEmail] = useState("");
    const [Password, SetPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [accountError, setAccountError] = useState(false);
    const navigation = useNavigation();

    const validateEmail = (email) => {

        if (!validator.isEmail(email)) {
            setEmailError('Invalid Email format');
            return false;
        }else{
            setEmailError('');
        }
        if (email !== 'Krishcs279@gmail.com') {  
            
            return false;
        }
        
        
        return true;
    };

    const validatePassword = (password) => {
        if (password.length < 6) {
            setPasswordError('Password should have at least 6 characters');
            return false;
        }
        else{
            setPasswordError('');
        }
        if (password !== 'Krish@123') {
           
            return false;
        }
        
        return true;
    };

    

    const handleTextChange = (text, field) => {
        if (field === 'email') {
            SetEmail(text);
            validateEmail(text);
        } else if (field === 'password') {
            SetPassword(text);
            validatePassword(text);
        }
    };

    const handleSubmit =   async () => {
        // const isEmailValid = validateEmail(Email);
        // const isPasswordValid = validatePassword(Password);
        // if (!isEmailValid || !isPasswordValid) {
        //     setAccountError(true);
        //     navigation.navigate(ScreenNames.Signup)
        //     return;
        // }

        // setAccountError(false);
       
        try {
            // Try signing in first
            await firebase.auth().signInWithEmailAndPassword(Email, Password);
            console.log('User logged in successfully!');
            navigation.navigate(ScreenNames.Home); 
      
          } catch (error) {
            console.log('User not found. Attempting to sign up...');
          }
    };

  return (
    <View style={styles.container}>
      
      <View style={styles.signupContainer}>
            
                <View style={styles.textContain}>
                    <Text style={styles.signText}>
                       Hello,
                    </Text>

                    <Text style={styles.welText}>
                       Welcome Back!
                    </Text>

                    
                </View>

                <View style={styles.textInputContain}>

                    <View style={[styles.inputContainer, emailError && { borderColor: 'red' }]}>
                        <TextInput
                            placeholder="Email Address"
                            style={styles.input}
                            value={Email}

                            onChangeText={(text) => handleTextChange(text, 'email')}
                        />

                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    </View>


                    <View style={[styles.inputContainer1, passwordError && { borderColor: 'red' }]}>
                        <View style={styles.passwordContain}>
                            <TextInput
                                placeholder="Password"
                                style={styles.input}
                                value={Password}

                                onChangeText={(text) => handleTextChange(text, 'password')}
                            />
                            <TouchableOpacity>
                                <Image source={Images.eye} style={styles.img2} />
                            </TouchableOpacity>

                        </View>


                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    </View>


                    
                </View>

                <View style={styles.forget}>
                    <TouchableOpacity>
                    <Text style={styles.forgetText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                        
                    </View>
                <View style={styles.touchContain}>
                    <TouchableOpacity style={styles.touch} onPress={handleSubmit}>
                        <Text style={styles.text}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footerContain}>
                    <View style={styles.footerView}>

                    </View>
                    <Text style={styles.option}>Or Sign in With</Text>
                    <View style={styles.footerView}>
                                                                   
                    </View>                                                                                                                              
                </View>

                <View style={styles.otherOption}>
                    <View style={styles.googleView}>
                       <Image source={Images.google} style={styles.google}/>
                    </View>
                    <View style={styles.googleView}>
                       <Image source={Images.facebook} style={styles.google}/>
                    </View>
                </View>


                <View style={styles.dontView}>
                    <Text>Don't have an account?</Text>      
                    <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.Signup)}>
                    <Text style={styles.signupColor}> Sign Up</Text>     
                        </TouchableOpacity>  
                    
                </View>

            </View>
    </View>
  )
}

export default Signin
