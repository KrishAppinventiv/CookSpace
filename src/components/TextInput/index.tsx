
import React, { forwardRef } from 'react';
import { TextInput, StyleSheet,TextInputProps } from 'react-native';


interface InputFieldProps extends TextInputProps {
  style?: object;
}

const InputField = forwardRef<TextInput, InputFieldProps>((props, ref) => {
  const { value, placeholder, onChangeText, style, onSubmitEditing, secureTextEntry, returnKeyType } = props;
  
  return (
    <TextInput
      ref={ref}
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      secureTextEntry={secureTextEntry}
      returnKeyType={returnKeyType}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    padding: 10,
  },
});

export default InputField;  // Make sure this is a default export
