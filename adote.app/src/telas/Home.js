import React, {useState,useEffect} from 'react';
import {StyleSheet,Text,FlatList, SafeAreaView, View,Alert, RefreshControl} from 'react-native';
import Pets from './components/Pets';

import Topo from './components/Topo';
import { AsyncStorage } from 'react-native';
import { API_URL } from '@env';
  
export default function Home({navigation}) {
  const [pets, setPets] = useState([]);
  const [cliente, setCliente] = useState([])

  const [refreshing, setRefreshing] = useState(false); 

  const onRefresh = () => {
    setRefreshing(true);
    buscaPets();
    setRefreshing(false);
  
  };
  
  const _getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@session')
      if(value !== null) {
        buscaDadosCliente(value);
      }
    } catch(e) {
      // error reading value
    }
  }

  const buscaPets = async () =>{
     fetch(API_URL + '/pet/status/disponivel')
          .then(response => response.json())
          .then(json => setPets(json))
          .catch(error => console.log(error))
  }

  const buscaDadosCliente = async (cpf) =>{
    fetch(API_URL + '/cliente/' + cpf)
         .then(response => response.json())
         .then(json => setCliente(json))
         .catch(error => console.log(error))
 }

  useEffect(() => {
    // Atualiza o título do documento usando a API do browser
    buscaPets();
    _getData();    
  },[]);

  return (
      <SafeAreaView style={styles.container}>
        <Topo cliente={cliente} navigation={navigation}/>
        <View style={{marginTop: 140, height: 510, width: 410,backgroundColor: 'black'}}>
         <FlatList 
           refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={pets}
          renderItem={({ item }) => <Pets id_cliente={cliente.id_cliente} navigation={navigation} {...item}></Pets>}/>
        </View>
      </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#F0E68C',
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



