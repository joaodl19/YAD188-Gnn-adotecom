import React, {useState,useEffect} from 'react';
import {TextInput, Text,Image, TouchableWithoutFeedback, StyleSheet,Alert, SafeAreaView, View} from 'react-native';
import {Statusbar} from 'expo-status-bar';
import {TouchableOpacity} from 'react-native';
import UploadImage from './components/UploadImage'
import { API_URL } from '@env';

export default function CadastroPet({route, navigation}) {
  
  const id_cliente = route.params;

  const [nome, setNome] = useState('');
  const [dtnascimento, setDtnasc] = useState('');
  const [raca, setRaca] = useState('');
  const [genero, setGenero] = useState('');
  const [ong, setOng] = useState('');
  const [status, setStatus] = useState('');
  const [obs, setObs] = useState('');
  const [foto, setFoto] = useState('');

  const telaPerfil = () => navigation.goBack();


  const cadastropet =  () => {
      
    fetch((API_URL+'/pet'),{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ "ds_nome": nome,
                                     "dt_nascimento": dtnascimento,
                                     "ds_raca": raca,
                                     "ds_genero": genero,
                                     "id_ong": id_cliente,
                                     "ds_obs": obs,
                                     "tx_foto": foto})
                                    }
              )
              .then(() => {Alert.alert("Pronto! Obrigado por cadastrar seu Pet."),
                            telaPerfil()})
         .catch(error => console.log(error))   
         //telaHome(cpf))
  }


  return (
      <View style={styles.container}>

          <Image style={styles.logo} source={require('../../assets/LogoT.png')}/>
          <Text style={styles.saudacoes}>Preencha os campos abaixo para cadastrar o Pet!</Text>  
          <TextInput placeholder='Nome...' style={styles.TextInput} value={nome} onChangeText={(nome)=>setNome(nome)}/>
          <TextInput placeholder='Data...' style={styles.TextInput} value={dtnascimento} onChangeText={(dtnascimento)=>setDtnasc(dtnascimento)}/>
          <TextInput placeholder='Raça...' style={styles.TextInput} value={raca} onChangeText={(raca)=>setRaca(raca)}/>
          <TextInput placeholder='Genero..' style={styles.TextInput} value={genero} onChangeText={(genero)=>setGenero(genero)}/>
          <TextInput placeholder='Observações...' style={styles.TextInput} value={obs} onChangeText={(obs)=>setObs(obs)}/>
          <TextInput placeholder='Foto...' style={styles.TextInput} value={foto} onChangeText={(foto)=>setFoto(foto)}/>
          <View style={{marginLeft:100, height:40}}>
            <UploadImage setProps={setFoto} ></UploadImage>
          </View>
          <TouchableOpacity style={styles.botao}  onPress={()=>cadastropet()}>
           <Text style={{color:'white',textAlign:'center'}}>CADASTRAR!</Text>
          </TouchableOpacity>
        </View>
      
      
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
    height: 20,
    width: 50
  },
  botao: {
    paddingLeft: 15,
    height: 25,
    width: '50%',
    marginTop: 35,
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center'
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
    marginBottom: 20,
    marginLeft: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign:'center'
},
responderText:{
    fontSize: 18,
    marginTop: 5,
    color: 'white',
    marginLeft: 20 
},
    logo: {
        height: 70,
        width: 300,
        resizeMode: 'center',
        marginBottom: 50,
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

