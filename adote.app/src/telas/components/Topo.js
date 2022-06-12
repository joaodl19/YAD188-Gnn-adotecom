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
        <View style={{flexDirection: 'row', marginTop:15}}>
          <TouchableWithoutFeedback onPress={() => telaPerfil()}>
            <Image style={styles.perfil} source={{uri: getImageSource()}}/>
          </TouchableWithoutFeedback>
          <View style={{marginTop:25, marginStart:10}}>
            <Text style={{fontWeight:'bold', fontSize:18}}>Olá,</Text>
            <Text style={{fontWeight:'bold', fontSize:18}}>{cliente.ds_nome}</Text>
            <Text style={{fontWeight:'bold', marginTop:10}}>Clique em sua foto para acessar o perfil</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => telaLogin()}>
            <Text style={{marginStart:-50, fontWeight:'bold', fontSize:20}}>Sair</Text>
          </TouchableWithoutFeedback>
          </View>   
          <View style={{marginTop:10,marginStart:10}}>
            <TextInputComIcone></TextInputComIcone>
          </View>
          {cliente.ds_tipo_cliente == 'ONG' &&
          <Text style={{fontWeight:'bold', marginTop:5, fontSize:18,marginStart:30}}>
          Listagem dos seus Pets doados ao app</Text>}
          {cliente.ds_tipo_cliente == 'PF' &&
          <Text style={{fontWeight:'bold', marginTop:5, fontSize:18,marginStart:30}}>
          Listagem dos Pets disponíveis a adoção</Text>}

      </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 35,
    width: 200,
    marginStart: 100,
    marginTop:10
  },
  perfil: {
    marginTop: 25,
    marginStart: 10,
    height: 95,
    width: 95,
    borderRadius: 45
  },
  topo: {
    height: 270,
    marginTop: 10,
    },

});

