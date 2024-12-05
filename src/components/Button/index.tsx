import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { vh, vw } from '../../theme/dimensions';

interface ButtonProps {
  onPress: () => void;
  text: string;
  style?: object;
}

const Button: React.FC<ButtonProps> = ({ onPress, text, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.main,
    paddingVertical: 16,
    marginHorizontal:vw(30),
    borderRadius: vh(20),
    marginTop: vh(30),
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight:'600'
  },
});

export default Button;
