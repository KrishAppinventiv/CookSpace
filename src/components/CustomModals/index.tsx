import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';


import InputField from '../TextInput';
import Button from '../Button';
import { Images } from '../../assets';

type CustomModalProps = {
  visible: boolean;
  modalType: 'tooltip' | 'form';
  title?: string;
  message?: string;
  options?: { label: string, icon: any, action: () => void }[];
  onClose: () => void;
  emailValue?: string;
  onEmailChange?: (text: string) => void;
  onSubmit?: () => void;
  error?: string;
};

const CustomModals: React.FC<CustomModalProps> = ({
  visible,
  modalType,
  title,
  message,
  options,
  onClose,
  emailValue,
  onEmailChange,
  onSubmit,
  error,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {modalType === 'tooltip' ? (
          
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>
        ) : (
         
          <View style={styles.modalContent}>
            {title && <Text style={styles.modalTitle}>{title}</Text>}
            {message && <Text style={styles.modalText}>{message}</Text>}
            {emailValue && (
              <InputField
                placeholder="Email Address"
                value={emailValue}
                onChangeText={onEmailChange}
                style={error ? { borderColor: 'red' } : {}}
              />
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {onSubmit && (
              <Button
                onPress={onSubmit}
                text="Send Reset Link"
                style={styles.resetButton}
              />
            )}
            <Button
              onPress={onClose}
              text="Cancel"
              style={styles.cancelButton}
            />
          </View>
        )}

        {modalType === 'tooltip' && options && (
          <View style={styles.tooltipContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tooltipItem}
                onPress={option.action}
              >
                <Image source={option.icon} style={styles.tooltipIcon} />
                <Text style={styles.tooltipText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    marginTop: 10,
  },
  tooltipContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  tooltipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tooltipIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  tooltipText: {
    fontSize: 16,
  },
});

export default CustomModals;
