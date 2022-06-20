import React, {useState,useEffect} from 'react';
import {StyleSheet, useWindowDimensions, Image, FlatList,Text,TextInput,Picker, SafeAreaView,RefreshControl, View, TouchableWithoutFeedback, Alert} from 'react-native';
import QuestionarioCliente from './components/QuestionarioCliente';
import { API_URL } from '@env';

export default function ConfirmarAgendamento({route, navigation}) {
  const host_api = API_URL;
  const window = useWindowDimensions();
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
    fetch(host_api+'/agendamento/pet/'+id_pet)
         .then(response => response.json())
         .then(json => setDadosAgendamento(json))
         .catch(error => console.log(error))
  };
  
  const buscarDadosPet = async (id_pet) =>{
    fetch(host_api+'/pet/'+id_pet)
         .then(response => response.json())
         .then(json => setPet(json))
         .catch(error => console.log(error))
  };

  const aprovar = async (id_agendamento) =>{
    fetch(host_api + '/agendamento/' + id_agendamento + '/aprovar',{
        method: 'PUT'}
        )
         .then(response => response.json())
         .then(atualizarStatusPet(id_pet, 'Encerrado'))
         .catch(error => console.log(error))
        
}
const atualizarStatusPet = async (id_pet, status) =>{
  fetch((host_api + '/pet/' + id_pet + '/' + status),{
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
    fetch(host_api+'/questionario/'+id_cliente)
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
        <View style={{backgroundColor:'white', height:window.height * 0.26, width:window.width, marginTop:10, marginLeft:30}}>
            <View style={{backgroundColor:'#c0c0c0', marginTop:10, marginLeft:-35}}>
                <Text style={styles.fontdados}>Nome Pet: {dadosAgendamento.ds_nome_pet}</Text>
                <Text style={styles.fontdados}>Nome Cliente: {dadosAgendamento.ds_nome_cliente}</Text>
                <Text style={styles.fontdados}>Data Visita: {dadosAgendamento.dt_visita}</Text>
                <Text style={styles.fontdados}>Status: {pet.ds_status}</Text>
            </View>
            <View style={{marginTop: 15, flexDirection:'row'}}>
                {(pet.ds_status == 'Visita Realizada')?
                 <TouchableWithoutFeedback style={{}}
                    onPress={() => aprovarAdocao()}>
                    <View style={{marginLeft:50, backgroundColor:'green', height:50, width:110, borderRadius:30, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontSize:19, color:'white',fontWeight: 'bold'}}>Aprovar Adocao</Text>
                    </View>
                </TouchableWithoutFeedback>
                :
                <TouchableWithoutFeedback style={{}}
                    onPress={() => aprovar(dadosAgendamento.id_agendamento)}>
                    <View style={{marginLeft:-25, backgroundColor:'green', height:50, width:105, borderRadius:30, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontSize:19, color:'white',fontWeight: 'bold'}}>Reagendar</Text>
                    </View>
                </TouchableWithoutFeedback>
                }
                <TouchableWithoutFeedback style={{}}
                    onPress={() => telaConfirmarAgendamento()}>
                    <View style={{marginLeft:20, backgroundColor:'red', height:50, width:90, borderRadius:30, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', fontSize:19, color:'white',fontWeight: 'bold'}}>Cancelar</Text>
                    </View>
                </TouchableWithoutFeedback>
                {(pet.ds_status == 'Aguardando visita')?
                 <TouchableWithoutFeedback style={{}}
                 onPress={() => finalizarVisita()}>
                 <View style={{marginLeft:20, backgroundColor:'blue', height:50, width:140, borderRadius:30, justifyContent:'center'}}>
                     <Text style={{textAlign:'center', fontSize:19, color:'white',fontWeight: 'bold'}}>Finalizar visita</Text>
                 </View>
             </TouchableWithoutFeedback>
             :<Text></Text>}
               
            </View>         
        </View>
        {(questionario == true)?
         <View style={{marginTop:20, marginStart:70, height: window.height * 0.05}}>
            <Text style={{fontSize:25, fontWeight:'bold'}}>Questionario Cliente</Text>        
         </View>
         :<Text></Text>

        }
        {(questionario == true)?
        <View style={{backgroundColor:'white', height: window.height * 0.45, width:500, marginTop:20, marginLeft:-30}}>
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
    height:window.height,
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
  fontdados:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginStart: 40
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



