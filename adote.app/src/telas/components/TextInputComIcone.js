import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert,StyleSheet, TouchableWithoutFeedback, TextInput, View} from 'react-native';


export default function TextInputComIcone() {  
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
    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.input}
                placeholder='Pesquisar um Pet'
                placeholderTextColor="#666"
                >
            </TextInput>
            <TouchableWithoutFeedback
                onPress={getData}>
                <Icon name="md-search" size={20} color="#666" style={styles.icon}/>
            </TouchableWithoutFeedback>
            
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    inputContainer: {
        height: 45,
        width: 350,
        backgroundColor: '#CCF',
        borderRadius: 30,
        paddingLeft: 20,
        marginLeft: 10,
        flexDirection: 'row'
    },
    icon: {
        alignSelf: 'center',
        marginLeft: 20,
        paddingRight: 15
    },
    input: {
        fontSize: 15,
        width: 500,
        color: '#666',
        flex: 1
    },
    perfil: {
      height: 70,
      width: 70,
      marginStart: -80,
      borderRadius: 35
    },
    topo: {
      height: 100,
      marginTop: 190
    },
  
  });
  
  