import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Picker,
    TouchableWithoutFeedback
  } from 'react-native';

  export default function QuestionarioCliente({pergunta, respostas}){
    return(
        <View style={styles.container}>
            <Text style={styles.fontdados}>{pergunta}</Text>
            <Text style={styles.fontdados}>R: {respostas}</Text>
        </View>  
      )
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart:15,
        marginTop: 15
    },  
    item:{
        alignItems: 'center',
        backgroundColor: 'white',
        height: 80,
        width: 370,
        marginLeft: 10,
        marginTop: 30,
        flexDirection: 'row'
    },
      fontdados:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    dados:{
        marginLeft: 15,
        fontSize: 20
        },
    botaoResponder:{
        marginTop: 10,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        height: 40,
        width: 70,
        borderRadius: 15,
        backgroundColor: '#000080'
    },
    responderText:{
        fontSize: 18,
        marginTop: 5,
        color: 'white'
        
    }
    })