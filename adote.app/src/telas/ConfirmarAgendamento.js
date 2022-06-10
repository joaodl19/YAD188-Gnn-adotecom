import React, {useState,useEffect} from 'react';
import {StyleSheet, Image,FlatList,Text,TextInput,Picker, SafeAreaView,RefreshControl, View, TouchableWithoutFeedback, Alert} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars';
import Topo from './components/Topo';
import AgendamentoItem from './components/AgendamentoItem';
import { API_URL } from '@env';

export default function ConfirmarAgendamento({route, navigation}) {

  const [refreshing, setRefreshing] = useState(false); 

  const onRefresh = () => {
    setRefreshing(true);
    buscarDadosAgendamento(id_pet);
    setRefreshing(false);
  
  };

  const {id_pet} = route.params;
  const [dadosAgendamento, setDadosAgendamento] = useState([]);  
  const [cliente, setCliente] = useState([]);  

  const buscarDadosAgendamento = async (id_pet) =>{
    fetch(API_URL+'/agendamento/pet/'+id_pet)
         .then(response => response.json())
         .then(json => {setDadosAgendamento(json),
                        buscarDadosCliente(82)})
         .catch(error => console.log(error))
  };

  const aprovar = async (id_agendamento) =>{
    fetch((API_URL + '/agendamento/' + id_agendamento + '/aprovar'),{
        method: 'PUT'}
        )
         .then(response => response.json())
         .then(atualizarStatusPet(id_pet))
         .catch(error => console.log(error))
        
}

const buscarDadosCliente = async (id_cliente) =>{
  fetch(API_URL + '/cliente/' + id_cliente)
       .then(response => response.json())
       .then(json => setCliente(json))
       .catch(error => console.log(error))
      
}
const atualizarStatusPet = async (id_pet) =>{
  fetch((API_URL + '/pet/' + id_pet + '/Aguardando visita'),{
      method: 'PUT'}
      )
       .then(response => response.json())
       .then(Alert.alert("Aprovacao Realizada"),buscarDadosAgendamento(id_pet))
       .catch(error => console.log(error))
      
}

  useEffect(() => {
    buscarDadosAgendamento(id_pet);
  },[]);
  return (
    <SafeAreaView style={styles.container}>
        <Text style={{textAlign: 'center', marginTop:15, fontSize: 30, fontWeight: 'bold', color:''}}>Dados Agendamento</Text>
            <View style={{backgroundColor:'#808080', marginTop:30, marginStart:25, marginLeft:0, height:130, width:450}}>
              <View style={{backgroundColor:'#808080', marginTop:10, marginLeft:20}}>
                  <Text style={styles.fontdados}>Nome Pet: {dadosAgendamento.ds_nome_pet}</Text>
                  <Text style={styles.fontdados}>Nome Cliente: {dadosAgendamento.ds_nome_cliente}</Text>
                  <Text style={styles.fontdados}>Data Visita: {dadosAgendamento.dt_visita}</Text>
                  <Text style={styles.fontdados}>Status: {dadosAgendamento.ds_status}</Text>
              </View>
            </View>
            <View style={{backgroundColor:'#808080', marginTop:30, marginStart:25, marginLeft:0, height:130, width:450}}>
              <View style={{backgroundColor:'#808080', marginTop:10, marginLeft:20}}>
                  <Text style={styles.fontdados}>Endereco: {cliente.ds_logradouro} {cliente.nr_numero}</Text>
                  <Text style={styles.fontdados}>Bairro: {cliente.ds_bairro}</Text>
                  <Text style={styles.fontdados}>Cidade: {cliente.ds_cidade}</Text>
                  <Text style={styles.fontdados}>Estado: {cliente.ds_uf}</Text>
              </View>
            </View>
            <View style={{marginTop: 15, flexDirection:'row'}}>
                {(dadosAgendamento.ds_status == 'Pendente')?
                 <TouchableWithoutFeedback style={{}}
                    onPress={() => aprovar(dadosAgendamento.id_agendamento)}>
                    <View style={{marginLeft:20, backgroundColor:'green', height:40, width:110}}>
                        <Text style={{textAlign:'center', fontSize:19, color:'white',fontWeight: 'bold'}}>Confirmar</Text>
                    </View>
                </TouchableWithoutFeedback>
                :
                <TouchableWithoutFeedback style={{}}
                    onPress={() => aprovar(dadosAgendamento.id_agendamento)}>
                    <View style={{marginLeft:20, backgroundColor:'green', height:40, width:110}}>
                        <Text style={{textAlign:'center', fontSize:19, color:'white',fontWeight: 'bold'}}>Reagendar</Text>
                    </View>
                </TouchableWithoutFeedback>
                }
                <TouchableWithoutFeedback style={{}}
                    onPress={() => telaConfirmarAgendamento()}>
                    <View style={{marginLeft:20, backgroundColor:'red', height:40, width:110}}>
                        <Text style={{textAlign:'center', fontSize:19, color:'white',fontWeight: 'bold'}}>Cancelar</Text>
                    </View>
                </TouchableWithoutFeedback>
        </View>
    </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  fontdados:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
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



