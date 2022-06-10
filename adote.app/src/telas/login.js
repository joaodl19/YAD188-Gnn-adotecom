import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Text,
    Button,
    Alert,
    TouchableWithoutFeedback
  } from 'react-native';
import { AsyncStorage } from 'react-native';
import { API_URL } from '@env';

export default function Login({navigation}) {
    
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')

    const telaHome = () => navigation.navigate('Home', { cpf: cpf});
    const telaCadastro = () => navigation.navigate('Cadastro');

    const _storeData = async () => {
      try {
        await AsyncStorage.setItem('@session', cpf)
      } catch (e) {
        // saving error
      }
    }

    const login = ( cpf, senha )=>{
      fetch( (API_URL+'/login'),{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ "cpf": cpf,
                                     "senha": senha })
                                    }
              )
              .then(response => response.json())
              .then(json => {if(json.codigo == 1){telaHome(cpf);
                _storeData();
              }else{
                Alert.alert('LOGIN ERRO \n' + json.mensagem)
              }})
              .catch(error => console.log(error))
    }
    
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.logo} source={require('../../assets/LogoT.png')} />
          <Text style={{fontFamily:'Lexend Mega', marginStart:50 ,fontSize:40, fontWeight:'bold', color:'#0b3a5c' }}>Bem-Vindo</Text>
        </View>
        <View>
            <TextInput
                value={cpf}
                onChangeText={(cpf) => {setCpf(cpf)}}
                style={styles.input}
                placeholder='CPF/CNPJ'
                placeholderTextColor="white" 
            ></TextInput>
            <TextInput
                value={senha}
                onChangeText={(senha) => {setSenha(senha)}}
                placeholder='Senha'
                placeholderTextColor="white"
                secureTextEntry={true}
                style={styles.input}
            ></TextInput>
            <View style={{ flexDirection: 'row', marginTop:10}}>
              <TouchableWithoutFeedback style={{borderRadius:20}}
                  onPress={() => {telaCadastro()}}>
                  <View style={{ backgroundColor:'#696969', height:50, width:220, borderRadius:12}}>
                      <Text style={{padding:5, paddingStart:10, fontSize:30, color:'white'}}>Registre-se</Text>
                  </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback style={{}}
                  onPress={() => {login( cpf, senha ),setSenha('')}}>
                  <View style={{ backgroundColor:'#0b3a5c', height:50, width:110, borderRadius:12, marginLeft:-20}}>
                      <Text style={{padding:5, paddingStart:10, fontSize:30, color:'white'}}>Entrar</Text>
                  </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    logo: {
      height: 60,
      width: 300,
      marginBottom: 10,
    },
    botao: {
      height: 500,
      width: 200,
      marginTop: 200,
      color: '#008000',
    },
    input: {
        backgroundColor: '#c0c0c0',
        height: 50,
        width: 310,
        marginTop: 10,
        borderRadius: 15,
        fontSize: 30,
        paddingStart: 10,
        borderColor: '#000080',
        color:'black',

      }
  
  });
  
  