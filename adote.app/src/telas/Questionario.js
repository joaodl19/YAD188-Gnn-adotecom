import React, {useState,useEffect} from 'react';
import {Alert,Image, Text,TouchableWithoutFeedback, useWindowDimensions , StyleSheet,FlatList, SafeAreaView, View} from 'react-native';
import Questao from './components/Questao';
import { API_URL } from '@env';


export default function Questionario({navigation, route}) {
 
  const host_api = API_URL;
  const {id_cliente, id_ong, id_pet} = route.params;
  const [questionario, setQuetionario] = useState([])
  const [cliente, setCliente] = useState([])
  const window = useWindowDimensions();
  const telaAgendamento = () => navigation.navigate('Agendamento', {id_cliente: id_cliente,
     id_pet: id_pet,
      id_ong: id_ong})
  const buscaQuestionario = () =>{
    fetch(host_api + '/questionario')
         .then(response => response.json())
         .then(json => setQuetionario(json))
         .catch(error => console.log(error))
 }

 const inserirQuestionario = async (id_cliente, respostas) =>{
    await fetch((host_api+'/questionario/'+id_cliente),{
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    backgroundColor: 'white'  
  },
  botaoResponder:{
    marginTop:window.width * 0.140,   
    height: window.width * 0.140,
    width: window.width * 0.440,
    borderRadius: window.width * 0.040,
    backgroundColor: '#000080'
},
saudacoes:{
    fontSize:  window.width * 0.055 ,
    marginTop: window.width * 0.020,
    marginLeft: window.width * 0.010,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center'
},
responderText:{
    fontSize: window.width * 0.060,
    marginTop: window.width * 0.020,
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center'
},
    logo: {
        height: window.width * 0.200,
        width: window.width * 0.550,
        resizeMode: 'center',
        marginBottom: window.width * 0.200,
        marginLeft: window.width * 0.050,
        marginTop: 20
      }    
});


  useEffect(() => {
    buscaQuestionario(),
    buscaDadosCliente(id_cliente)
  },[]);

  return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', marginTop:20}}> 
          <Image style={styles.logo} source={require('../../assets/LogoT.png')}/>
        </View>   
        <View style={{backgroundColor: 'white', marginTop: window.width * -0.170, height:  window.width * 1.260}}>
            <Text style={styles.saudacoes}>Olá! Responda o questionário abaixo para ajudarmos a escolher o Pet ideal para o seu lar.</Text>        
            <View style={{marginTop:  window.width * 0.100, height:  window.width * 0.940, backgroundColor: '#c0c0c0'}}> 
              <FlatList                 
                data={questionario}
                renderItem={({ item }) => <Questao {...item} setProps={gravaResposta} value={respostas}
                keyExtractor={(item, index) => index.toString()}/>}
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


