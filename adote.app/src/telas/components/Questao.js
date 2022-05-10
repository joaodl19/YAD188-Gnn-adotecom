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

  export default function Questao({pergunta, respostas, setProps, value}){
    return(
        <View style={styles.container}>
            <View style={styles.item}>
                    <View style={styles.dados}>
                    <Text style={styles.fontdados}>{pergunta.ds_pergunta}</Text>
                    <Picker
                        
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => setProps(value, {"id_pergunta":pergunta.id_pergunta,"ds_pergunta":pergunta.ds_pergunta,
                         "ds_resposta":itemValue})}
                        >
                    <Picker.item label="" value={""}/>
                    {respostas.map(name => (  
                      <Picker.item label={name.ds_resposta} value={name.ds_resposta}/>
                    ))}
                    </Picker>                
                </View>
            </View>
        </View>  
      )
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 18,
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