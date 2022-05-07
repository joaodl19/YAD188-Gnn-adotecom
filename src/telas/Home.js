import React, {useState,useEffect} from 'react';
import {StyleSheet,FlatList, SafeAreaView, View} from 'react-native';
import Pets from './components/Pets';

import Topo from './components/Topo';

export default function Home({route}) {
  
  const [pets, setPets] = useState([]);  
  
  const teste = async () =>{
     fetch('http://192.168.0.142:8081/pet/status/disponivel')
          .then(response => response.json())
          .then(json => setPets(json))
          .catch(error => console.log(error))
  }

  useEffect(() => {
    // Atualiza o título do documento usando a API do browser
    teste()
  },[]);
  return (
      teste,
      <SafeAreaView style={styles.container}>
        <Topo/>
        <View style={{marginTop: 140, height: 510, width: 410,backgroundColor: 'black'}}>
         <FlatList 
          data={pets}
          renderItem={({ item }) => <Pets {...item}></Pets>}/>
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



