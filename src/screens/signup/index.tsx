import { StyleSheet, Text, TouchableOpacity, View,TextInput ,Image,Alert} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import validator from 'validator';
import { ScreenNames } from '../../navigator/screenNames';
import auth from '@react-native-firebase/auth';
import { getFirestore , FieldValue} from '@react-native-firebase/firestore';


const Signup = () => {


    const [Email, SetEmail] = useState("");
    const [Name, SetName] = useState("");
    const [Password, SetPassword] = useState("");
    const [CnfrmPassword, SetCnfrmPassword] = useState("");
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
        else if (field === 'cnfrmPassword') {
            SetCnfrmPassword(text);
            
        }
        else if (field === 'name') {
            SetName(text);
            
        }
    };

    const handleSubmit = async () => {
        const firestore = getFirestore();
        console.log(firestore); 
    
        try {
          
            const userCredential = await auth().createUserWithEmailAndPassword(Email, Password);
            console.log("User created successfully");
    
            const user = userCredential.user;
            console.log("Saving user data to Firestore...");
    
            
            const userDocRef = firestore.collection('users').doc(user.uid);
            console.log(userDocRef); 
    
           
            if (userDocRef && typeof userDocRef.set === 'function') {
               
                await userDocRef.set({
                    name: Name,
                    email: Email,
                    profilePic: '',
                    createdAt: FieldValue.serverTimestamp(),
                    dateofbirth: '',
                    savedItem:[],
                    PostItem:[]
                });
                console.log('User data saved to Firestore successfully!');
                navigation.navigate(ScreenNames.Signin); // Navigate after successful sign-up
            } else {
                
                Alert.alert('There was an error saving your data. Please try again later.');
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
  return (
    <View style={styles.container}>
      
      <View style={styles.signupContainer}>
            
                <View style={styles.textContain}>
                    <Text style={styles.signText}>
                       Create an Account
                    </Text>

                    <Text style={styles.welText}>
                    Let’s help you set up your account, it won’t take long.
                    </Text>

                    
                </View>

                <View style={styles.textInputContain}>
                
                <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Name"
                            style={styles.input}
                            value={Name}

                            onChangeText={(text) => handleTextChange(text, 'name')}
                        />

                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    </View>

                    <View style={[styles.inputContainer, emailError && { borderColor: 'red' }]}>
                        <TextInput
                            placeholder="Email Address"
                            style={styles.input}
                            value={Email}

                            onChangeText={(text) => handleTextChange(text, 'email')}
                        />

                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    </View>


                    <View style={[styles.inputContainer, passwordError && { borderColor: 'red' }]}>
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


                    <View style={styles.inputContainer1}>
                        <View style={styles.passwordContain}>
                            <TextInput
                                placeholder="Confirm Password"
                                style={styles.input}
                                value={CnfrmPassword}

                                onChangeText={(text) => handleTextChange(text, 'cnfrmPassword')}
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
                            Accept Term & Condition
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

                <View style={{flexDirection:'row',justifyContent:'center',marginTop:40}}>
                    <View style={{height:1,width:30,backgroundColor:'#c7c7c7',alignSelf:'center'}}>

                    </View>
                    <Text style={{marginHorizontal:10,color:'#c7c7c7'}}>Or Sign in With</Text>
                    <View style={{height:1,width:30,backgroundColor:'#c7c7c7',alignSelf:'center'}}>
                                                                   
                    </View>                                                                                                                              
                </View>

                <View style={{flexDirection:'row',justifyContent:'center',marginTop:40}}>
                    <View style={{height:54,width:54,elevation:2,justifyContent:'center',alignItems:'center',shadowColor: '#C3C3C3',shadowOpacity: 5,shadowRadius: 3,backgroundColor:'white',borderRadius:10,marginHorizontal:10}}>
                       <Image source={Images.google} style={{height:28,width:28}}/>
                    </View>
                    <View style={{height:54,width:54,elevation:2,justifyContent:'center',alignItems:'center',shadowColor: '#C3C3C3',shadowOpacity: 5,shadowRadius: 3,backgroundColor:'white',borderRadius:10,marginHorizontal:10}}>
                       <Image source={Images.facebook} style={{height:28,width:28}}/>
                    </View>
                </View>


                <View style={{flexDirection:'row',justifyContent:'center',marginTop:60}}>
                    <Text>Already have an account?</Text>      
                    <TouchableOpacity>
                    <Text style={{color:'#FF9C00'}}> Sign In</Text>     
                        </TouchableOpacity>  
                    
                </View>                                

            </View>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    img: {
        marginTop: 20,
        height: 42,
        width: 120
    },
    imageContain: {
        marginTop: 10,
        marginStart: 30,
        marginBottom:40
    },
    signText: {
        color: "#000000",
        fontSize: 30,
        fontWeight: '700',
    },

    welText: {
        color: "#000000",
        fontSize: 12,
        fontWeight: '400',
        fontFamily:'Poppins',
        width:200
    },
    blurBackground: {
        opacity: 0.6,
    },
    textContain: {
        marginTop: 40,
        marginStart: 36
    },
    greyText: {
        color: "grey",
        marginTop: 10,
        width: 270,
        fontSize: 15,
        fontWeight: '600'
    },
    input: {
        alignItems: 'center',
        padding: 10,
        color: 'black',
    },
    inputContainer: {
        padding:10,
        width: 350,
        borderRadius: 7,
        borderColor: "#ccc",
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: 35

    },

    inputContainer1: {
        padding:10,
        width: 350,
        borderRadius: 7,
        borderColor: "#ccc",
        borderWidth: 1,
        backgroundColor: 'white',
        

    },

    textInputContain: {
        marginHorizontal: 15,
        marginTop: 40,
        alignItems:'center'
    },
    touch: { 
        marginTop: 15,
       paddingHorizontal:130,
        paddingVertical:20,
        backgroundColor: "#129575",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white'
    },
    touchContain: {
        justifyContent: 'center',
        alignItems: 'center'
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
        alignItems: 'center'
    },

    
    signupContainer: {
        flex: 1,
        marginTop:30
    },
    errorContain:{
        height: 65,
        width: 350,
        borderRadius: 7,
        marginStart: 35,
        backgroundColor: '#ffe8e7',
       
        justifyContent:'center',
        alignItems:'center',
        marginBottom:30
    },
    redText:{
        color:"black",
        padding:10,
        fontSize:13,
        fontWeight:'400'
    },
    forget:{
    marginStart:39,
    marginTop:25,
    marginBottom:25
    },
    forgetText:{
        color:'#FFAD30',
        fontWeight:'600'
    },

    content:{
     marginStart:50,
     marginTop:20
        
    },

    instructionText:{
        paddingHorizontal:12,
        color:"grey",
        fontSize:12
    },
    instruction:{
        
        marginTop:17,
        marginBottom:10
    }


})


