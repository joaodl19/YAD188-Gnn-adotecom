import React, { useState, useEffect } from 'react';
import { StyleSheet, useWindowDimensions, ActivityIndicator, FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Alert } from 'react-native';
import SolicitacaoItem from './components/SolicitacaoItem';
import { API_URL } from '@env';

export default function Solicitacao({ route, navigation }) {

  const host_api = API_URL;
  const id_cliente = route.params;
  const [isLoading, setIsLoading] = useState(true);
 
  const window = useWindowDimensions();

  const telaHome = () => navigation.navigate('Home')

  const [solicitacao, setSolicitacao] = useState([]);

  const buscarSolicitacoes = async () => {
    fetch(host_api + '/solicitacao/' + id_cliente)
      .then(response => response.json())
      .then(json => {setSolicitacao(json)})
      .catch(error => console.log(error))
  };

  useEffect(() => {
    buscarSolicitacoes(id_cliente);
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
    <SafeAreaView style={styles.container}>
      {(isLoading == false)
        ?
        <View style={{ marginTop: window.height * 0.5 }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
        :
        <View style={{ marginTop: window.height * 0.08 }}>
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Minhas Solicitações</Text>
          <FlatList
              data={solicitacao}
              renderItem={({ item }) => <SolicitacaoItem {...item}></SolicitacaoItem>} 
              keyExtractor={(item, index) => index.toString()}/>

          <View style={{ marginTop: window.height * 0.043, flexDirection: 'row' }}>
            <TouchableWithoutFeedback style={{}}
              onPress={() => telaHome()}>
              <View style={{ marginLeft: window.width * 0.20, backgroundColor: 'blue', height: window.width * 0.130, width: window.width * 0.60, borderRadius: window.width * 0.060, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: window.width * 0.05019, color: 'white', fontWeight: 'bold' }}>Retornar para Home</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      }
    </SafeAreaView>

  );
}




