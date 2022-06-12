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
            <Text style={styles.dados}>R: {respostas}</Text>
        </View>  
      )
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart:22,
        marginTop: 5,
        backgroundColor: '#c0c0c0',
        height: 85
    },  
    item:{
        alignItems: 'center',
        backgroundColor: '#c0c0c0',
        height: 500,
        width: 370,
        marginLeft: 10,
        marginTop: 30,
        flexDirection: 'row'
    },
      fontdados:{
        fontSize: 20,
        fontWeight: 'bold',
        height: 50,
        width: 330,
        marginLeft: 50,
        color:'white'
    },
    
    dados:{
        fontSize: 20,
        fontWeight: 'bold',
        height: 50,
        width: 330,
        marginLeft: 50,
        color:'black'
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