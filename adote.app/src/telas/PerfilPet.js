import React, {useState,useEffect} from 'react';
import {StyleSheet,Text, SafeAreaView, View,Image, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native';
import { API_URL } from '@env';

export default function PerfilPet({route, navigation}){
  const {id_pet, id_cliente, id_ong}  = route.params
  const [pet, setPet] = useState([]);
  const telaHome = () => navigation.navigate('Home')
  const telaQuestionario = () => navigation.navigate('Questionario', {id_cliente: id_cliente, id_ong: id_ong,id_pet: id_pet})
  //const telaPerfilPet = () => navigation.navigate('PerfilPet')
  const getImageSource = () => {
    return `data:image/jpeg;base64,${pet.tx_foto}`
  }
  const perfis = async () =>{
      fetch(API_URL + '/pet/' + id_pet,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      }
          )
           .then(response => response.json())
           .then(json => setPet(json))
           //.then(Alert.alert("Perfil Criado")
           .catch(error => console.log(error))
          
  }
  const adotar = async (id_pet, id_cliente) =>{
    fetch(API_URL + '/adocao',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "id_pet": id_pet,
                               "id_cliente": id_cliente})
                              }
        )
         .then(() => {Alert.alert("Pedido de Adocao Criado, preencha o questionario");
                        telaQuestionario()})
         .catch(error => console.log(error)
         )
        
}

  useEffect(() => {
      perfis()
    },[]);

  return(
    <SafeAreaView style={styles.container}>

      <Image style={styles.logo} source={require('../../assets/LogoT.png')}/>
    
     <Image style={styles.perfil} source={{uri: getImageSource()}}/>

      <TouchableOpacity style={styles.botao2}  onPress={()=>adotar(id_pet, id_cliente)}>
           <Text style={{color:'white',textAlign:'center'}}>Adotar</Text>
      </TouchableOpacity>      
   
      <Text style={styles.saudacoes}>Dados do Pet:</Text>  
            
              
              <View style={styles.item}><Text style={styles.fontdados}>Nome: {pet.ds_nome}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Raca: {pet.ds_raca}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Data Nascimento: {pet.dt_nascimento}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Gênero: {pet.ds_genero}</Text></View>  
              <View style={styles.item}><Text style={styles.fontdados}>Status: {pet.ds_status}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Observações: {pet.ds_obs}</Text></View>
         
              
          <TouchableOpacity style={styles.botao}  onPress={()=>telaHome()}>
           <Text style={{color:'white',textAlign:'center'}}>Retornar para Home</Text>
          </TouchableOpacity>
          
    
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    backgroundColor: '#F0E68C',
  },
  item:{
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 30,
    width: 300,
    marginLeft: 10,
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingStart: 10,
    borderColor: 'black',
    borderWidth: 2
},
  dados:{
    marginLeft: 15,
    fontSize: 18,
    backgroundColor: 'black'
  },
  botao: {
    height: 25,
    width: '50%',
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  botao2: {
    marginLeft: 180,
    height: 20,
    width: '40%',
    marginTop: 1,
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    marginBottom: 5
  },
  botao3: {
    marginLeft: 180,
    height: 20,
    width: '40%',
    marginTop: 1,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    marginBottom: 10
  },
  TextInput:{ 
    paddingLeft: 15,
    height: 25,
    width: '70%',
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: 'white'
    
},
saudacoes:{
    fontSize: 20,
    marginTop: 0,
    marginBottom: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign:'center'
},
fontdados:{
  fontSize: 16,
  fontWeight: 'bold',
  marginLeft: 20,
  color: 'black'
},
    logo: {
        height: 60,
        width: 250,
        resizeMode: 'center',
        marginBottom: 15,
        marginLeft: 20
      },
      perfil: {
        marginTop: 0,
        height: 80,
        width: 80,
        marginLeft: -220,
        borderRadius: 45
      },
      topo: {
        height: 100,
        marginTop: 20
      },
    
});