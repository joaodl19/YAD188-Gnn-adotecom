import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Text, useWindowDimensions, FlatList, SafeAreaView, View, Alert, RefreshControl } from 'react-native';
import Pets from './components/Pets';

import Topo from './components/Topo';
import { AsyncStorage } from 'react-native';
import { API_URL } from '@env';

export default function Home({ navigation }) {

  const host_api = API_URL
  const window = useWindowDimensions();
  const [pets, setPets] = useState([]);
  const [cliente, setCliente] = useState([])
  const [ong, setOng] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    (cliente.ds_tipo_cliente == 'ONG') ? buscaPetsOng(cliente.id_cliente) : buscaPets();
    setRefreshing(false);

  };

  const _getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@session')
      if (value !== null) {
        buscaDadosCliente(value);

      }
    } catch (e) {
      // error reading value
    }
  }

  const buscaPets = async () => {
    fetch(host_api + '/pet/status/Disponivel')
      .then(response => response.json())
      .then(json => {
        setPets(json);
        buscaDadosOng(pets.id_ong)
        setIsLoading(true)
      })
      .catch(error => console.log(error))
  }
  const buscaPetsOng = async (id_ong) => {
    fetch(host_api + '/pet/ong/' + id_ong)
      .then(response => response.json())
      .then(json => {
        setPets(json);
        buscaDadosOng(pets.id_ong)
        setIsLoading(true)
      })
      .catch(error => console.log(error))
  }

  const buscaDadosCliente = async (cpf) => {
    fetch(host_api + '/cliente/' + cpf)
      .then(response => response.json())
      .then(json => {
        setCliente(json), (json.ds_tipo_cliente == 'ONG') ? buscaPetsOng(json.id_cliente) : buscaPets();

      })

      .catch(error => console.log(error))
  }

  const buscaDadosOng = async (idOng) => {
    fetch(host_api + '/cliente/' + idOng)
      .then(response => response.json())
      .then(json => setOng(json))
      .catch(error => console.log(error))
  }
  useEffect(() => {
    // Atualiza o título do documento usando a API do browser
    _getData();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading == false) ?
        <View style={{ marginTop: 300 }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
        :
        <View>
          <Topo cliente={cliente} navigation={navigation} />
          <View style={{ marginTop: 0, height: 400, width: 385, backgroundColor: '#808080' }}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              data={pets}
              renderItem={({ item }) => <Pets id_cliente={cliente.id_cliente} tipo_cliente={cliente.ds_tipo_cliente} navigation={navigation} {...item}></Pets>} />
          </View>
        </View>
      }
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 2,
    backgroundColor: 'white',
    height: 40,
    width: 250,
    marginTop: 10,
    borderRadius: 5,
    fontSize: 15,
    paddingStart: 10,
    borderColor: '#000080',
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

});



