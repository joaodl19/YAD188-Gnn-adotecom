import React, {useState,useEffect} from 'react';
import {StyleSheet, useWindowDimensions,FlatList,Text,TextInput,Picker, SafeAreaView,RefreshControl, View, TouchableWithoutFeedback, Alert} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars';
import Topo from './components/Topo';
import AgendamentoItem from './components/AgendamentoItem';
import { API_URL } from '@env';

export default function ConfirmarAgendamento({route, navigation}) {

  const host_api = API_URL;
  const [refreshing, setRefreshing] = useState(false); 
  const telaConfirmarAgendamento = () => navigation.navigate('ConfirmarAgendamento')
  const telaHome = () => navigation.navigate('Home')

  const window = useWindowDimensions();
  const onRefresh = () => {
    setRefreshing(true);
    buscarDadosAgendamento(id_pet);
    setRefreshing(false);
  
  };

  const {id_pet} = route.params;
  const [dadosAgendamento, setDadosAgendamento] = useState([]);  
  const [cliente, setCliente] = useState([]);  

  const buscarDadosAgendamento = async (id_pet) =>{
    fetch(host_api+'/agendamento/pet/'+id_pet)
         .then(response => response.json())
         .then(json => {setDadosAgendamento(json),
                        buscarDadosCliente(82)})
         .catch(error => console.log(error))
  };

  const aprovar = async (id_agendamento) =>{
    fetch((host_api + '/agendamento/' + id_agendamento + '/aprovar'),{
        method: 'PUT'}
        )
         .then(response => response.json())
         .then(atualizarStatusPet(id_pet))
         .catch(error => console.log(error))
        
}

const buscarDadosCliente = async (id_cliente) =>{
  fetch(host_api + '/cliente/' + id_cliente)
       .then(response => response.json())
       .then(json => setCliente(json))
       .catch(error => console.log(error))
      
}
const atualizarStatusPet = async (id_pet) =>{
  fetch(host_api + '/pet/' + id_pet + '/Aguardando visita',{
      method: 'PUT'}
      )
       .then(response => response.json())
       .then(Alert.alert("Aprovacao Realizada"),buscarDadosAgendamento(id_pet))
       .catch(error => console.log(error))
      
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
    botao: {
    height:  window.height * 0.065,
    width: window.width * 0.705,
    marginTop: window.width * 0.115,
    marginStart:window.width * 0.155,
    borderRadius: window.width * 0.065,
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
   fontdados:{
    fontSize: window.height * 0.025,
    fontWeight: 'bold',
    color: 'white'
}

});


  useEffect(() => {
    buscarDadosAgendamento(id_pet);
  },[]);
  
  return (
    <SafeAreaView style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: window.height * 0.060, fontSize: window.height * 0.040, fontWeight: 'bold', color:'black'}}>Dados Agendamento</Text>
            <View style={{backgroundColor:'#808080', marginTop:window.height * 0.030, marginStart:window.height * -0.001, height:window.height * 0.170, width:window.width * 1.150}}>
              <View style={{backgroundColor:'#808080', marginTop:window.height * 0.015, marginLeft:window.height * 0.025}}>
                  <Text style={styles.fontdados}>Nome Pet: {dadosAgendamento.ds_nome_pet}</Text>
                  <Text style={styles.fontdados}>Nome Cliente: {dadosAgendamento.ds_nome_cliente}</Text>
                  <Text style={styles.fontdados}>Data Visita: {dadosAgendamento.dt_visita}</Text>
                  <Text style={styles.fontdados}>Status: {dadosAgendamento.ds_status}</Text>
              </View>
            </View>
            <View style={{backgroundColor:'#808080', marginTop:window.height * 0.030, marginStart:window.height * -0.001, height:window.height * 0.170, width:window.width * 1.150}}>
              <View style={{backgroundColor:'#808080', marginTop:window.height * 0.015, marginLeft:window.height * 0.025}}>
                  <Text style={styles.fontdados}>Endereco: {cliente.ds_logradouro} {cliente.nr_numero}</Text>
                  <Text style={styles.fontdados}>Bairro: {cliente.ds_bairro}</Text>
                  <Text style={styles.fontdados}>Cidade: {cliente.ds_cidade}</Text>
                  <Text style={styles.fontdados}>Estado: {cliente.ds_uf}</Text>
              </View>
            </View>
            <View style={{marginTop: window.height * 0.025, flexDirection:'row'}}>
                {(dadosAgendamento.ds_status == 'Pendente')?
                 <TouchableWithoutFeedback style={{}}
                    onPress={() => aprovar(dadosAgendamento.id_agendamento)}>
                    <View style={{marginLeft:window.height * 0.025, backgroundColor:'green', height:window.height * 0.055, width:window.width * 0.340 , borderRadius: window.width * 0.060,justifyContent: 'center'}}>
                        <Text style={{textAlign:'center', fontSize:window.height * 0.028, color:'white',fontWeight: 'bold'}}>Confirmar</Text>
                    </View>
                </TouchableWithoutFeedback>
                :
                <TouchableWithoutFeedback style={{}}
                    onPress={() => aprovar(dadosAgendamento.id_agendamento)}>
                    <View style={{marginLeft:window.height * 0.025, backgroundColor:'green', height:window.height * 0.055, width:window.width * 0.340 , borderRadius: window.width * 0.060,justifyContent: 'center'}}>
                        <Text style={{textAlign:'center', fontSize:window.height * 0.028, color:'white',fontWeight: 'bold'}}>Reagendar</Text>
                    </View>
                </TouchableWithoutFeedback>
                }
                <TouchableWithoutFeedback style={{}}
                    onPress={() => telaConfirmarAgendamento()}>
                    <View style={{marginLeft:window.height * 0.105, backgroundColor:'red', height:window.height * 0.055, width:window.width * 0.340 , borderRadius: window.width * 0.060,justifyContent: 'center'}}>
                        <Text style={{textAlign:'center', fontSize:window.height * 0.028, color:'white',fontWeight: 'bold'}}>Cancelar</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.botao}>
              <TouchableWithoutFeedback  onPress={() => telaHome()}>
                <Text style={{textAlign:'center', fontSize:window.height * 0.028, color:'white',fontWeight: 'bold'}}>Retornar ao Menu</Text>
              </TouchableWithoutFeedback>
            </View>
    </SafeAreaView>
      
  );
}




