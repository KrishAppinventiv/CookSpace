
import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';



const androidConfig = {
    apiKey: "AIzaSyCJDxE-wA926q1mYvQh7cw4ocVmtdUDKnE",  
    authDomain: "cookspace-74a01.firebaseapp.com",   
    projectId: "cookspace-74a01",                    
    storageBucket: "cookspace-74a01.firebasestorage.app", 
    messagingSenderId: "887902040289",               
    appId: "1:887902040289:android:6602a7ad04fff026f287a0", 
    measurementId: "G-XXXXXXX",                      
  };


  const iosConfig = {
    apiKey: "AIzaSyAa6of-jVUDHUpH2oPLhPmE_kdjkgVWoaM",  
    authDomain: "cookspace-74a01.firebaseapp.com",    
    projectId: "cookspace-74a01",                    
    storageBucket: "cookspace-74a01.firebasestorage.app", 
    messagingSenderId: "887902040289",                
    appId: "1:887902040289:ios:27e63976fd4529baf287a0", 
    measurementId: "G-XXXXXXX",                       
  };

  const firebaseConfig = Platform.select({
    ios: iosConfig,
    android: androidConfig,
  });


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); 
}


export { firebase };
