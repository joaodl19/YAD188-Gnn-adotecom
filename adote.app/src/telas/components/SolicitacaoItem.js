import React, { useState, useEffect } from 'react';
import { StyleSheet, useWindowDimensions, ActivityIndicator, Text, SafeAreaView, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { API_URL } from '@env';

export default function SolicitacaoItem({ ds_nome_pet, ds_nome_ong, dt_visita, dt_adocao, ds_status, id_pet, id_adocao }) {
  const window = useWindowDimensions();

  const telaHome = () => navigation.navigate('Home');
  
  useEffect(() => {

  }, []);

  const styles = StyleSheet.create({
    container: {
      height: window.height,
      width: window.width,
      flex: 1,
      backgroundColor: '#fff',
      backgroundColor: 'white',
    },
    input: {
      borderWidth: 1,
      backgroundColor: 'white',
      height: 40,
      width: 250,
      marginStart: 20,
      marginTop: 10,
      borderRadius: 5,
      fontSize: 15,
      paddingStart: 10,
    },
    logo: {
      height: 120,
      width: 300
    },
    botao: {
      height: 500,
      width: 200,
      marginTop: 200,
      color: '#008000',
    },
    fontdados: {
      fontSize: window.height * 0.025,
      fontWeight: 'bold',
      color: 'white'
    },
    responderText: {
      fontSize: 18,
      marginTop: 5,
      color: 'white',
      marginLeft: 10
    },
    botaoResponder: {
      marginTop: 10,
      marginLeft: 20,
      height: 40,
      width: 95,
      borderRadius: 15,
      backgroundColor: '#000080'
    },

  });

  return (

        <View style={{ marginTop: window.height * 0.02 }}>
          <View style={{ backgroundColor: '#808080', marginTop: window.height * 0.030, marginStart: window.height * -0.001, height: window.height * 0.210, width: window.width * 1.150 }}>
            <View style={{ backgroundColor: '#808080', marginTop: window.height * 0.015, marginLeft: window.height * 0.025 }}>
              <Text style={styles.fontdados}>Nome Pet: {ds_nome_pet}</Text>
              <Text style={styles.fontdados}>Ong : {ds_nome_ong}</Text>
              <Text style={styles.fontdados}>Data Visita: {dt_visita}</Text>
              <Text style={styles.fontdados}>Data Adocao: {dt_adocao}</Text>
              <Text style={styles.fontdados}>Status: {ds_status}</Text>
            </View>
          </View>
        </View>


  );
}




