import React, {useState,useEffect} from 'react';
import {TextInput, Text,Image, TouchableWithoutFeedback,KeyboardAvoidingView,
StyleSheet,Alert, SafeAreaView,ScrollView, View,Picker} from 'react-native';
import {Statusbar} from 'expo-status-bar';
import {TouchableOpacity} from 'react-native';
import UploadImage from './components/UploadImage'
import { API_URL } from '@env';
import DatePicker from 'react-native-datepicker'
import {TextInputMask} from 'react-native-masked-text';

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
  const [errorRaca, setErrorRaca] = useState('')
  const [errorNome, setErrorNome] = useState('')
  const [errorDtnascimento, setErrordtNascimento] = useState('')
  const [errorGenero, setErrorGenero] = useState(null)

  const telaPerfil = () => navigation.goBack();

  const validar = () => {
    let error = false
    
    setErrordtNascimento('')
    setErrorNome('')
    setErrorRaca('')
    setErrorGenero(null)

    if (raca == ''){
        setErrorRaca("Preencha a Raça do Pet")
        error = true
    }
    if (dtnascimento == ''){
            setErrordtNascimento("Preencha a data de nascimento")
            error = true
    }
    if (nome == ''){
            setErrorNome("Preencha o nome")
            error = true
    }
    
    if (genero == null){
            setErrorGenero("Preencha o genero")
            error = true
    }

    return !error
  }

  const cadastropet =  () => {
    if (validar()){
    fetch(API_URL+'/pet',{
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
                    }else {Alert.alert("Cadastro incompleto , preencha os campos obrigatórios");console.log()} 
  }

  return (
     
    <ScrollView>
    <KeyboardAvoidingView        
    style={[styles.container]}
    keyboardVerticalOffset={80}>
      
      <SafeAreaView style={styles.container}>

          <Image style={styles.logo} source={require('../../assets/LogoT.png')}/>
          <Text style={styles.saudacoes}>Preencha os campos abaixo para cadastrar o Pet!</Text>  
          
          <TextInput placeholder='Nome do Pet' 
          placeholderTextColor="white"
          style={styles.TextInput} 
          value={nome} 
          onChangeText={(nome)=>{setNome(nome)
          setErrorNome('')}}
       
          errorMessage={errorNome}/>

        <Text style={styles.errorMessage}>{errorNome}</Text>

          <DatePicker
        style={styles.TextInput}
        date={dtnascimento}
        mode="date"
        placeholder='Data Nascimento'
        placeholderTextColor="white"
        format="YYYY-MM-DD"
        minDate="1920-05-01"
        maxDate="2022-06-30"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 275,
            top: 4,
            marginLeft: -5,
            color: 'white'
          },
          placeholderText: {
            fontSize: 20,
            color: "white",
            marginStart: 75
          },
          dateInput: {
            marginLeft: -250,
            fontSize: 20,
            fontcolor: 'white',
            borderColor: 'transparent'
          },
          dateText: {
            fontSize: 20,
            color: "black",
            textAlign: "left",
            marginStart: 25
            }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(dtnascimento) => {setDtnasc(dtnascimento)
         setErrordtNascimento('')}}
         
      />  

    <Text style={styles.errorMessage}>{errorDtnascimento}</Text>


          <TextInput placeholder='Raça' 
          placeholderTextColor="white"
          style={styles.TextInput} value={raca} 
          onChangeText={(raca) => {setRaca(raca)
          setErrorRaca('')}}
          errorMessage={errorRaca}/>

        <Text style={styles.errorMessage}>{errorRaca}</Text>
          
          
          <View style={styles.TextInput} >        
        <Picker 
        selectedValue={genero}
        placeholder='Gênero'
        
        style={{height: 50, width: 300, marginStart: -44, color: 'white'}}
        onValueChange={(genero) => {setGenero(genero)
        setErrorGenero(null)}}
        errorMessage={errorGenero}>
        <Picker.Item label="Selecione o Sexo"/>
        <Picker.Item label="Macho" value="Macho" />
        <Picker.Item label="Fêmea" value="Fêmea" />
      </Picker>
      </View>     

      <Text style={styles.errorMessage}>{errorGenero}</Text>

    
          <TextInput placeholder='Observações...'
          placeholderTextColor="white"
           style={styles.TextInput} value={obs} onChangeText={(obs)=>setObs(obs)}/>

      <Text style={styles.errorMessage}></Text>

          <View style={{marginLeft:-52, height:40,width: 150}}>
            <UploadImage setProps={setFoto} ></UploadImage>
          </View>
          <TouchableOpacity style={styles.botao}  onPress={()=>cadastropet()}>
           <Text style={styles.responderTextbt}>Cadastrar</Text>
          </TouchableOpacity>
        
          </SafeAreaView>
        </KeyboardAvoidingView>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 720,
    width: 380
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
    marginTop:40,   
        marginLeft: 0,
        marginBottom: 20,
        height: 50,
        width: 300,
        borderRadius: 15,
        backgroundColor: '#000080'
        
  },
  TextInput:{ 
    borderWidth: 0.5,
    backgroundColor: '#c0c0c0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 352,
    marginStart: 0,
    marginTop: 10,
    borderRadius: 10,
    fontSize: 20,
    paddingStart: 20,
    borderColor: 'transparent',
    
},
saudacoes:{
    fontSize: 20,
    marginTop: 0,
    marginBottom: 20,
    marginLeft:12,
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
      containerMask: {
        flexDirection: "row",
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10
      },
      errorMessage: {
        alignSelf: "flex-start",
        marginLeft: 35,
        color: "#f00",
        fontSize: 12
      },
      responderTextbt:{
        fontSize: 27,
        marginTop: 5,
        color: 'white',
        marginLeft: 10 ,
        justifyContent: 'center',
        textAlign: 'center'
        }
    
});



