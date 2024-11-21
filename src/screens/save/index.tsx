import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Images } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import { vh, vw } from '../../theme/dimensions'

const Save = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
   

    <View style={styles.head}>
      <Text
        style={styles.heading}>
        Saved Recipes
      </Text>
    </View></SafeAreaView>
  )
}

export default Save

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: vh(23),
    fontWeight: '600',
    alignSelf: 'center',
  },
  head: {
    justifyContent: 'center',
    marginTop:vh(10),
  },
    container: {
        flex: 1,
        backgroundColor: 'white',
        
      },
     
})