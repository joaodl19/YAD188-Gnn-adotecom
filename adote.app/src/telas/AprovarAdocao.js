import React, {useState,useEffect} from 'react';
import {StyleSheet, Image,FlatList,Text,TextInput,Picker, SafeAreaView,RefreshControl, View, TouchableWithoutFeedback, Alert} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars';
import Topo from './components/Topo';
import AgendamentoItem from './components/AgendamentoItem';
import QuestionarioCliente from './components/QuestionarioCliente';
import { API_URL } from '@env';

export default function ConfirmarAgendamento({route, navigation}) {

  const [refreshing, setRefreshing] = useState(false); 

  const onRefresh = () => {
    setRefreshing(true);
    buscaQuestionarioCliente(dadosAgendamento.id_cliente);
    setRefreshing(false);
  
  };
  const telaHome = () => navigation.navigate('Home')

  const {id_pet} = route.params;
  const [pet, setPet] = useState([]);  
  const [dadosAgendamento, setDadosAgendamento] = useState([]);  
  const [dadosQuestionario, setDadosQuestionario] = useState([]);  
  const [questionario, setQuestionario] = useState('false');  

  const buscarDadosAgendamento = async (id_pet) =>{
    fetch(API_URL+'/agendamento/pet/'+id_pet)
         .then(response => response.json())
         .then(json => setDadosAgendamento(json))
         .catch(error => console.log(error))
  };
  
  const buscarDadosPet = async (id_pet) =>{
    fetch(API_URL+'/pet/'+id_pet)
         .then(response => response.json())
         .then(json => setPet(json))
         .catch(error => console.log(error))
  };

  const aprovar = async (id_agendamento) =>{
    fetch((API_URL + '/agendamento/' + id_agendamento + '/aprovar'),{
        method: 'PUT'}
        )
         .then(response => response.json())
         .then(atualizarStatusPet(id_pet, 'Encerrado'))
         .catch(error => console.log(error))
        
}
const atualizarStatusPet = async (id_pet, status) =>{
  fetch((API_URL + '/pet/' + id_pet + '/' + status),{
      method: 'PUT'}
      )
       .then(response => response.json())
       .then(buscarDadosAgendamento(id_pet))
       .catch(error => console.log(error))
      
}

const aprovarAdocao = () =>{
    atualizarStatusPet(id_pet, 'Aguardando retirada');
    Alert.alert("Adoção aprovada com sucesso, aguardando a retirada do pet");
    telaHome();
}
const buscaQuestionarioCliente = async (id_cliente) =>{
    fetch(API_URL+'/questionario/'+id_cliente)
         .then(response => response.json())
         .then(json => setDadosQuestionario(json))
         .catch(error => console.log(error))
  };

  const finalizarVisita = () => {
    atualizarStatusPet(id_pet, 'Visita Realizada');
    buscaQuestionarioCliente(dadosAgendamento.id_cliente);
    buscarDadosAgendamento(id_pet);
    buscarDadosPet(id_pet);
    setQuestionario(true);
  }

  useEffect(() => {
    buscarDadosAgendamento(id_pet);
    buscarDadosPet(id_pet);
  },[]);
  return (
    <SafeAreaView style={styles.container}>
        <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>Aprovar Adoção</Text>
        <View style={{backgroundColor:'white', height:200, width:430, marginTop:30, marginLeft:30}}>
            <View style={{backgroundColor:'white', marginTop:20, marginLeft:20}}>
                <Text style={styles.fontdados}>Nome Pet: {dadosAgendamento.ds_nome_pet}</Text>
                <Text style={styles.fontdados}>Nome Cliente: {dadosAgendamento.ds_nome_cliente}</Text>
                <Text style={styles.fontdados}>Data Visita: {dadosAgendamento.dt_visita}</Text>
                <Text style={styles.fontdados}>Status: {pet.ds_status}</Text>
            </View>
            <View style={{marginTop: 15, flexDirection:'row'}}>
                {(pet.ds_status == 'Visita Realizada')?
                 <TouchableWithoutFeedback style={{}}
                    onPress={() => aprovarAdocao()}>
                    <View style={{marginLeft:20, backgroundColor:'green', height:50, width:110}}>
                        <Text style={{textAlign:'center', fontSize:19, color:'white',fontWeight: 'bold'}}>Aprovar Adocao</Text>
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
                {(pet.ds_status == 'Aguardando visita')?
                 <TouchableWithoutFeedback style={{}}
                 onPress={() => finalizarVisita()}>
                 <View style={{marginLeft:20, backgroundColor:'blue', height:40, width:140}}>
                     <Text style={{textAlign:'center', fontSize:19, color:'white',fontWeight: 'bold'}}>Finalizar visita</Text>
                 </View>
             </TouchableWithoutFeedback>
             :<Text></Text>}
               
            </View>         
        </View>
        {(questionario == true)?
         <View style={{marginTop:20, marginStart:40}}>
            <Text style={{fontSize:25, fontWeight:'bold'}}>Questionario Cliente</Text>        
         </View>
         :<Text></Text>

        }
        {(questionario == true)?
        <View style={{backgroundColor:'white', height:400, width:430, marginTop:30, marginLeft:30}}>
            <FlatList 
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              data={dadosQuestionario}
              renderItem={({ item }) => <QuestionarioCliente {...item}/>}/>
            
        </View>
        :
        <Text></Text>
        }
        
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
  fontdados:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
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



