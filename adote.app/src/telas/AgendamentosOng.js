import React, {useState,useEffect} from 'react';
import {StyleSheet,FlatList,Text,TextInput,Picker, SafeAreaView,RefreshControl, View, TouchableWithoutFeedback, Alert} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars';
import Topo from './components/Topo';
import AgendamentoItem from './components/AgendamentoItem';
import { API_URL } from '@env';

export default function AgendamentosOng({route, navigation}) {
  
  const host_api = API_URL;
  const [refreshing, setRefreshing] = useState(false); 

  const onRefresh = () => {
    setRefreshing(true);
    startAgendamentos(id_cliente);
    setRefreshing(false);
  
  };

  const {id_cliente} = route.params;
  const [agendamentos, setAgendamentos] = useState([]);  
  const startAgendamentos = async (id_cliente) =>{
    await fetch(host_api+'/agendamento/'+id_cliente)
         .then(response => response.json())
         .then(json => setAgendamentos(json))
         .catch(error => console.log(error))
  };
  useEffect(() => {
    startAgendamentos(id_cliente);
  },[]);
  return (
    <SafeAreaView style={styles.container}>
        <Text style={{fontSize: 22, marginStart:25, marginTop: 20}}>Meus Agendamentos</Text>
        <View style={{marginTop: 140, height: 510, width: 410}}>
         <FlatList 
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={agendamentos}
          renderItem={({ item }) => <AgendamentoItem {...item}></AgendamentoItem>}/>
        </View>
    </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#F0E68C',
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
  
responderText:{
  fontSize: 18,
  marginTop: 5,
  color: 'white',
  marginLeft: 10 
},
botaoResponder:{
  marginTop:10,   
  marginLeft: 20,
  height: 40,
  width: 95,
  borderRadius: 15,
  backgroundColor: '#000080'
},

});



