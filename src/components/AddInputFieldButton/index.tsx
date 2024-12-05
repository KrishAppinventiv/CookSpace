import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet,View } from 'react-native';
import { Images } from '../../assets';
import { vh, vw } from '../../theme/dimensions';


interface AddInputFieldButtonProps {
  onPress: () => void;
  label: string;
}

const AddInputFieldButton: React.FC<AddInputFieldButtonProps> = ({ onPress, label }) => {
  return (
    
    <View style={styles.add}>
      <TouchableOpacity  style ={styles.touch}onPress={onPress}>
        <Image source={Images.plus} style={styles.addIcon} />
      
      <Text style={styles.addIconText}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  add: {
    marginTop: vh(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: vw(20),
    height: vh(20),
  },
  addIconText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight:'600',
    color: '#4CAF50',
  },
  touch:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AddInputFieldButton;
