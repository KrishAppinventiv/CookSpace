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
            navigation.navigate(ScreenNames.Home); // Navigate to Home screen after login
      
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

// const styles = StyleSheet.create({
//   signupColor: {
//     color:'#FF9C00',
//   },
//   dontView: {
//     flexDirection:'row',
//     justifyContent:'center',
//     marginTop:60,
//   },
//   google: {
//     height:28,
//     width:28,
//   },
//   googleView: {
//     height:54,
//     width:54,
//     elevation:2,
//     justifyContent:'center',
//     alignItems:'center',
//     shadowColor: '#C3C3C3',
//     shadowOpacity: 5,
//     shadowRadius: 3,
//     backgroundColor:'white',
//     borderRadius:10,
//     marginHorizontal:10,
//   },
//   otherOption: {
//     flexDirection:'row',
//     justifyContent:'center',
//     marginTop:40,
//   },
  
//   option: {
//     marginHorizontal:10,
//     color:'#c7c7c7',
//   },
//   footerView: {
//     height:1,
//     width:30,
//     backgroundColor:'#c7c7c7',
//     alignSelf:'center',
//   },
//   footerContain: {
//     flexDirection:'row',
//     justifyContent:'center',
//     marginTop:40,
//   },
//     container: {
//         flex: 1,
//         backgroundColor: "#ffffff"
//     },
//     img: {
//         marginTop: 20,
//         height: 42,
//         width: 120
//     },
//     imageContain: {
//         marginTop: 10,
//         marginStart: 30,
//         marginBottom:40
//     },
//     signText: {
//         color: "#000000",
//         fontSize: 30,
//         fontWeight: '700',
//     },

//     welText: {
//         color: "#000000",
//         fontSize: 23,
//         fontWeight: '400',
//         fontFamily:'Poppins'
//     },
//     blurBackground: {
//         opacity: 0.6,
//     },
//     textContain: {
//         marginTop: 40,
//         marginStart: 35
//     },
//     greyText: {
//         color: "grey",
//         marginTop: 10,
//         width: 270,
//         fontSize: 15,
//         fontWeight: '600'
//     },
//     input: {
//         alignItems: 'center',
//         padding: 10,
//         color: 'black',
//     },
//     inputContainer: {
//         padding:10,
//         width: 350,
//         borderRadius: 7,
//         borderColor: "#ccc",
//         borderWidth: 1,
//         backgroundColor: 'white',
//         marginBottom: 25

//     },

//     inputContainer1: {
//         padding:10,
//         width: 350,
//         borderRadius: 7,
//         borderColor: "#ccc",
//         borderWidth: 1,
//         backgroundColor: 'white',
        

//     },

//     textInputContain: {
//         marginHorizontal: 15,
//         marginTop: 75,
//         alignItems:'center'
//     },
//     touch: { 
//         marginTop: 15,
//        paddingHorizontal:130,
//         paddingVertical:20,
//         backgroundColor: "#129575",
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },

//     text: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: 'white'
//     },
//     touchContain: {
//         justifyContent: 'center',
//         alignItems: 'center'
//     },

//     errorText: {
//         color: 'red',
//         fontSize: 12,
//         marginTop: 5,
//         marginLeft: 10,
//     },
//     img2: {
//         height: 16,
//         width: 16,
//         marginEnd: 10,
//         alignItems: 'center',
//     },
//     passwordContain: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     },

    
//     signupContainer: {
//         flex: 1,
//         marginTop:80
//     },
//     errorContain:{
//         height: 65,
//         width: 350,
//         borderRadius: 7,
//         marginStart: 35,
//         backgroundColor: '#ffe8e7',
       
//         justifyContent:'center',
//         alignItems:'center',
//         marginBottom:30
//     },
//     redText:{
//         color:"black",
//         padding:10,
//         fontSize:13,
//         fontWeight:'400'
//     },
//     forget:{
//     marginStart:39,
//     marginTop:25,
//     marginBottom:25
//     },
//     forgetText:{
//         color:'#FFAD30',
//         fontWeight:'600'
//     },

//     content:{
//      marginStart:50,
//      marginTop:20
        
//     },

//     instructionText:{
//         paddingHorizontal:12,
//         color:"grey",
//         fontSize:12
//     },
//     instruction:{
        
//         marginTop:17,
//         marginBottom:10
//     }

// })