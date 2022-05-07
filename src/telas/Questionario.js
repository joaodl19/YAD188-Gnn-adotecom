import React, {useState,useEffect} from 'react';
import {Alert,Image, Text,TouchableWithoutFeedback, StyleSheet,FlatList, SafeAreaView, View} from 'react-native';
import Questao from './components/Questao';

import Topo from './components/Topo';

export default function Questionario({navigation}) {
  
  const [questionario, setQuetionario] = useState([])
  const telaHome = () => navigation.navigate('Home')
  const buscaQuestionario = async () =>{
    await fetch('http://192.168.0.142:8081/questionario')
         .then(response => response.json())
         .then(json => setQuetionario(json))
         .catch(error => console.log(error))
 }

 const inserirQuestionario = async (id, respostas) =>{
    await fetch('http://192.168.0.142:8081/questionario/' + id,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(respostas)})
         .then(response => response.json())
         .then(Alert.alert("Pronto! Obrigado por responder o questionario."))
         .catch(error => console.log(error),    
         console.log(respostas),
         telaHome()
         )        
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
  useEffect(() => {
    buscaQuestionario()
  },[]);

  return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row'}}> 
          <Image style={styles.perfil} source={require('../../assets/perfil.png')}/>
          <Image style={styles.logo} source={require('../../assets/LogoT.png')}/>
          </View>   
          <View >
        </View>
        <View style={{backgroundColor: 'white', marginTop: 10, height: 500}}>
            <Text style={styles.saudacoes}>Olá! Responda o questionário abaixo para ajudarmos a escolher o Pet ideal para o seu lar.</Text>        
        <View style={{marginTop: 50, height: 330, backgroundColor: 'white'}}> 
         <FlatList 
          data={questionario}
          renderItem={({ item }) => <Questao {...item} setProps={gravaResposta} value={respostas}>
          </Questao>}/>
        </View>
        <TouchableWithoutFeedback style={{marginBottom: 80}}
                        onPress={() => inserirQuestionario("1",respostas)}>
                    <View style={styles.botaoResponder}>
                        <Text style={styles.responderText}>Enviar</Text>
                    </View> 
                </TouchableWithoutFeedback>
        </View>
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
    width: 300
  },
  botao: {
    marginTop: 10,
    height: 500,
    width: 200,
    marginTop: 200,
    color: '#008000',
  },
  botaoResponder:{
    marginTop:10,   
    marginLeft: 150,
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

