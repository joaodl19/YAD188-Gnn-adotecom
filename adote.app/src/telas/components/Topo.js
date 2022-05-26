import React, {useState,useEffect} from 'react';
import {Image,StyleSheet, View, Text,Alert, TouchableWithoutFeedback} from 'react-native';
import TextInputComIcone from './TextInputComIcone';
export default function Topo( {navigation, cliente}) {
  
  const getImageSource = () => {
    return `data:image/jpeg;base64,${cliente.tx_foto}`
  }

  const telaPerfil = () => navigation.navigate('Perfil', {cliente});
  const telaLogin = () => navigation.navigate('Login');

  useEffect(() => {
  },[]);
  
  return (
      <View style={styles.topo}>
        <Image style={styles.logo} source={require('../../../assets/LogoT.png')}/>  
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={() => telaPerfil()}>
            <Image style={styles.perfil} source={{uri: getImageSource()}}/>
          </TouchableWithoutFeedback>
          <View style={{marginTop:25, marginStart:10}}>
                <Text style={{fontWeight:'bold'}}>Olá,</Text>
                <Text style={{fontWeight:'bold'}}>{cliente.ds_nome}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => telaLogin()}>
            <Text style={{marginStart:150, fontWeight:'bold', fontSize:16}}>Sair</Text>
          </TouchableWithoutFeedback>
         
          </View>   
          <View style={{marginTop:10}}>
            <TextInputComIcone></TextInputComIcone>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 150,
    marginStart: 100
  },
  perfil: {
    marginTop: 20,
    marginStart: 5,
    height: 90,
    width: 90,
    marginLeft: -20,
    borderRadius: 45
  },
  topo: {
    height: 100,
    marginTop: 20
  },

});

