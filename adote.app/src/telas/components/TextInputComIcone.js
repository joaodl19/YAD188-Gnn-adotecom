import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert,StyleSheet, TouchableWithoutFeedback, TextInput, View, useWindowDimensions} from 'react-native';

export default function TextInputComIcone() {  
  const window = useWindowDimensions();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@session')
      Alert.alert("CPF: ")

      if(value !== null) {
        Alert.alert("CPF: " + value)
      }
    } catch(e) {
      Alert.alert(e)
    }
  }
  
  const styles = StyleSheet.create({
    inputContainer: {
        height: window.height * 0.058,
        width: window.width * 0.915,
        backgroundColor: '#CCF',
        borderRadius: window.height * 0.058,
        paddingLeft: window.height * 0.038,
        marginLeft: window.height * 0.012,
        flexDirection: 'row'
    },
    icon: {
        alignSelf: 'center',
        marginLeft: window.height * 0.012,
        paddingRight: window.height * 0.022
    },
    input: {
        fontSize: window.height * 0.020,
        width: window.width * 0.822,
        color: '#666',
        flex: 1
    }
  
  });
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input}
                placeholder='Pesquisar um Pet'
                placeholderTextColor="#666"
                >
            </TextInput>
            <TouchableWithoutFeedback
                onPress={getData}>
                <Icon name="md-search" size={window.width * 0.055} color="#666" style={styles.icon}/>
            </TouchableWithoutFeedback>
            
      </View>
    );
  }
  
  
  