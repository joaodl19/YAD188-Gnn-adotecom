import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, ActivityIndicator, useWindowDimensions, FlatList, SafeAreaView, View, Alert, RefreshControl } from 'react-native';
import Pets from './components/Pets';

import Topo from './components/Topo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export default function Home({ navigation }) {

  const host_api = API_URL;
  const window = useWindowDimensions();
  const [pets, setPets] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [ong, setOng] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    (cliente.ds_tipo_cliente == 'ONG') ? buscaPetsOng(cliente.id_cliente) : buscaPets(cliente.ds_uf);
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

  const buscaPets = async (uf) => {
    fetch(host_api + '/pet/statusUf/Disponivel/' + uf)
      .then(response => response.json())
      .then(json => {
        setPets(json);
        setIsLoading(true)
      })
      .catch(error => console.log(error))
  }
  const buscaPetsOng = async (id_ong) => {
    fetch(host_api + '/pet/ong/' + id_ong)
      .then(response => response.json())
      .then(json => {
        setPets(json);
        setIsLoading(true)
      })
      .catch(error => console.log(error))
  }

  const buscaDadosCliente = (cpf) => {
    fetch(host_api + '/cliente/' + cpf)
      .then(response => response.json())
      .then(json => {
        setCliente(json), (json.ds_tipo_cliente == 'ONG') ? buscaPetsOng(json.id_cliente) : buscaPets(json.ds_uf);
      })

      .catch(error => console.log(error))
  }

  const buscaDadosOng = async (idOng) => {
    fetch(host_api + '/cliente/' + idOng)
      .then(response => response.json())
      .then(json => setOng(json))
      .catch(error => console.log(error))
  }

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
    }

});

  useEffect(() => {
    _getData();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading == false) ?
        <View style={{ marginTop: window.height * 0.5 }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
        :
        <View>
     
          <Topo cliente={cliente} navigation={navigation} />
          <View style={{height: window.height * 0.590, width: window.width * 1.005, backgroundColor: '#808080' }}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              data={pets}
              renderItem={({ item }) => <Pets id_cliente={cliente.id_cliente} tipo_cliente={cliente.ds_tipo_cliente} navigation={navigation} {...item}></Pets>} 
              keyExtractor={(item, index) => index.toString()}/>
          </View>
        </View>
      }
    </SafeAreaView>

  );
}




