import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    useWindowDimensions,
    Picker,
    TouchableWithoutFeedback
  } from 'react-native';

  export default function Questao({pergunta, respostas, setProps, value}){
    const window = useWindowDimensions();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },  
        item:{
            alignItems: 'center',
            backgroundColor: '#c0c0c0',
            height: window.width * 0.240,
            width: window.width * 0.930,
            marginLeft: window.width * 0.028,
            marginTop: window.width * 0.042,
            flexDirection: 'row',
            borderRadius: window.width * 0.042,
            borderWidth: window.width * 0.002,
            borderColor: 'black'
        },
          fontdados:{
            fontSize: window.width * 0.050,
            fontWeight: 'bold'
        },
        dados:{
            marginLeft: window.width * 0.048,
            fontSize: window.width * 0.072,
            }
        })
    return(
        <View style={styles.container}>
            <View style={styles.item}>
                    <View style={styles.dados}>
                    <Text style={styles.fontdados}>{pergunta.ds_pergunta}</Text>
                    <Picker
                        
                        //style={{ height: 150, width: 150, }}
                        onValueChange={(itemValue) => setProps(value, {"id_pergunta":pergunta.id_pergunta,"ds_pergunta":pergunta.ds_pergunta,
                         "ds_resposta":itemValue})}
                        >
                    <Picker.item color='transparent' label="" value=""/>
                    {respostas.map(name => (  
                      <Picker.item label={name.ds_resposta} value={name.ds_resposta}/>
                    ))}
                    </Picker>                
                </View>
            </View>
        </View>  
      )
  };
  
