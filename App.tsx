import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect,useState} from 'react'
import RootNavigator from './src/navigator'
import { firebase } from './src/firebaseConfig'



const App = () => {



  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Check if Firebase is initialized after a slight delay (or after async setup)
    const checkFirebaseInitialization = async () => {
      const isInitialized = firebase.apps.length > 0;
      setFirebaseInitialized(isInitialized);
      
      console.log('Firebase is initialized:', isInitialized);
    };

    checkFirebaseInitialization();
  }, []); // Empty dependency array, so it runs only once

  return (
    <RootNavigator/>
  )
}

export default App

const styles = StyleSheet.create({})