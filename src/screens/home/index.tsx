import {View, Text, Button, StyleSheet} from 'react-native';
import React, { useEffect } from 'react';
// import styles from './styles';
import strings from '../../utils/string';
import {ScreenNames} from '../../navigator/screenNames';
import {useNavigation} from '@react-navigation/native';
import SplashScreen from '../splashScreen';

const Home = () => {
  const navigation: any = useNavigation();


  // useEffect(() => { 

  //   SplashScreen.hide()

  // }, []);
  const navigate = () => {
    // navigation.navigate(ScreenNames.BottomTab, {screen: ScreenNames.Profile});
    navigation.navigate(ScreenNames.Profile);
  };
  return (
    <View style={styles.main}>
      <View style={styles.red} />
      <View style={styles.yellow} />

      {/* <Text>{strings.hello}</Text>
      <Button title="Go to Profile" onPress={navigate} /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: 'orange'},
  red: {flex: 0.4, backgroundColor: 'red'},
  yellow: {flex: 0.6, backgroundColor: 'yellow'},
});
