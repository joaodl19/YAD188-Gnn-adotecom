import React, {useState,useEffect} from 'react';
import {Alert,Image, Text,TouchableWithoutFeedback, StyleSheet,FlatList, SafeAreaView, View} from 'react-native';
import Questao from './components/Questao';
import { API_URL } from '@env';

import Topo from './components/Topo';

export default function Questionario({navigation, route}) {
  const {id_cliente, id_ong, id_pet} = route.params;
  const [questionario, setQuetionario] = useState([])
  const [cliente, setCliente] = useState([])
  
  const telaHome = () => navigation.navigate('Home')
  const telaAgendamento = () => navigation.navigate('Agendamento', {id_cliente: id_cliente,
     id_pet: id_pet,
      id_ong: id_ong})
  const buscaQuestionario = () =>{
    fetch(API_URL + '/questionario')
         .then(response => response.json())
         .then(json => setQuetionario(json))
         .catch(error => console.log(error))
 }

 const inserirQuestionario = async (id_cliente, respostas) =>{
    await fetch((API_URL+'/questionario/'+id_cliente),{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(respostas)})
         .then(() => {Alert.alert("Pronto! Obrigado por responder o questionario.");
          telaAgendamento()})
         .catch(error => console.log(error),    
         console.log(respostas),
         )        
 }

 const buscaDadosCliente = async (cpf) =>{
  fetch(url+'/cliente/'+cpf)
       .then(response => response.json())
       .then(json => {setCliente(json);
                    
          })

       .catch(error => console.log(error))
} 

const [respostas, setRespostas] = useState([])

const gravaResposta = (prevRespostas, resposta) => {
    let index = respostas.findIndex((array) => array.id_pergunta == resposta.id_pergunta); 
    if(index == -1){
        setRespostas([...prevRespostas, resposta]);
    }else{
        prevRespostas[index] = resposta;
        setRespostas(prevRespostas);
    }}

const responder = (respostas) => {return(
  respostas.map(resposta => Alert.alert("id: " + resposta.id + " resp.: " + resposta.resposta)),
  console.log(respostas)
)}

const getImageSource = () => {
  return `data:image/jpeg;base64,${cliente.tx_foto}`
}

  useEffect(() => {
    buscaQuestionario(),
    buscaDadosCliente(id_cliente)
  },[]);

  return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row'}}> 
          <Image style={styles.logo} source={require('../../assets/LogoT.png')}/>
        </View>   
        <View style={{backgroundColor: 'white', marginTop: 10, height: 480}}>
            <Text style={styles.saudacoes}>Olá! Responda o questionário abaixo para ajudarmos a escolher o Pet ideal para o seu lar.</Text>        
            <View style={{marginTop: 50, height: 350, backgroundColor: 'white'}}> 
              <FlatList 
                data={questionario}
                renderItem={({ item }) => <Questao {...item} setProps={gravaResposta} value={respostas}/>}
              />
            </View>
        </View>
        <TouchableWithoutFeedback onPress={() => inserirQuestionario(id_cliente,respostas)}>
              <View style={styles.botaoResponder}>
                <Text style={styles.responderText}>Enviar</Text>
              </View> 
            </TouchableWithoutFeedback>
      </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
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
    width: 300,
    marginLeft: 30
  },
  botao: {
    marginTop: 10,
    height: 500,
    width: 200,
    marginTop: 200,
    color: '#008000',
  },
  botaoResponder:{
    marginTop:40,   
    marginRight:20,
    height: 40,
    width: 90,
    borderRadius: 15,
    backgroundColor: '#000080'
},
saudacoes:{
    fontSize: 22,
    marginTop: 10,
    marginLeft: 12,
    fontWeight: 'bold'
},
responderText:{
    fontSize: 18,
    marginTop: 5,
    color: 'white',
    marginLeft: 20 
},
    logo: {
        height: 60,
        width: 200,
        resizeMode: 'center',
        marginBottom: 100,
        marginLeft: 20
      },
      perfil: {
        marginTop: 60,
        height: 90,
        width: 90,
        marginLeft: -20,
        borderRadius: 45
      },
      topo: {
        height: 100,
        marginTop: 20
      },
    
});

