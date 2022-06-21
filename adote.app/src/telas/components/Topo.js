import React, {useState,useEffect} from 'react';
import {Image,StyleSheet, View, Text,useWindowDimensions, TouchableWithoutFeedback} from 'react-native';
import TextInputComIcone from './TextInputComIcone';
export default function Topo( {navigation, cliente}) {
  
  const getImageSource = () => {
    return `data:image/jpeg;base64,${cliente.tx_foto}`
  }

  const telaPerfil = () => navigation.navigate('Perfil', {cliente});
  const telaLogin = () => navigation.navigate('Login');
  const window = useWindowDimensions();
  
const styles = StyleSheet.create({
  logo: {
    height: window.height * 0.052,
    width: window.width * 0.548,
    marginStart: window.width * 0.248,
    marginTop: window.height * 0.015
  },
  perfil: {
    marginTop: window.height * 0.025,
    marginStart: window.height * 0.012,
    height: window.height * 0.125,
    width: window.width * 0.258,
    borderRadius: window.width * 0.120
  },
  topo: {
    height: window.height * 0.390,
    marginTop: window.height * 0.06,
    },

});

  useEffect(() => {
  },[]);
  
  return (
      <View style={styles.topo}>
        <Image style={styles.logo} source={require('../../../assets/LogoT.png')}/>  
        <View style={{flexDirection: 'row', marginTop:window.height * 0.020}}>
          <TouchableWithoutFeedback onPress={() => telaPerfil()}>
            <Image style={styles.perfil} source={{uri: getImageSource()}}/>
          </TouchableWithoutFeedback>
          <View style={{marginTop:window.height * 0.025, marginStart:window.height * 0.015}}>
            <Text style={{fontWeight:'bold', fontSize:window.height * 0.022}}>Olá,</Text>
            <Text style={{fontWeight:'bold', fontSize:window.height * 0.022}}>{cliente.ds_nome}</Text>
            <Text style={{fontWeight:'bold', marginTop:window.height * 0.013}}>Clique em sua foto para acessar o perfil</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => telaLogin()}>
            <Text style={{fontWeight:'bold', fontSize:window.width * 0.058}}>Sair</Text>
          </TouchableWithoutFeedback>
          </View>   
          <View style={{marginTop:window.width * 0.030,marginStart:window.width * 0.030}}>
            <TextInputComIcone></TextInputComIcone>
          </View>
          {cliente.ds_tipo_cliente == 'ONG' &&
          <Text style={{fontWeight:'bold', marginTop:window.height * 0.020, fontSize:window.height * 0.024,marginStart:window.width * 0.055}}>
          Listagem dos seus Pets doados ao app</Text>}
          {cliente.ds_tipo_cliente == 'PF' &&
          <Text style={{fontWeight:'bold', marginTop:window.height * 0.010, fontSize:window.height * 0.024,marginStart:window.width * 0.055}}>
          Listagem dos Pets disponíveis a adoção</Text>}

      </View>
  );
}


