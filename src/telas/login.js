import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Button,
    Alert,
  } from 'react-native';
import apiAdoteApp from '../../routes/apiAdoteHttp';  

export default function Login({navigation}) {
    
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const telaHome = (cpf) => navigation.navigate('Home', {
      cpf
    });
    
    const login = ( email, senha )=>{
      fetch('http://192.168.0.142:8081/login',{
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ "cpf": email,
                                     "senha": senha })
                                    }
              )
              .then(response => response.json())
              .then(json => {if(json.codigo == 1){
                telaHome(email)
              }else{
                Alert.alert('LOGIN ERRO \n' + json.mensagem)
              }})
              .catch(error => console.log(error))
    }
    
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.logo} source={require('../../assets/LogoT.png')} />
        </View>
        <View>
            <TextInput
                value={email}
                onChangeText={(email) => {setEmail(email)}}
                style={styles.input}
                placeholder='Digite seu CPF ou Email'
            ></TextInput>
            <TextInput
                value={senha}
                onChangeText={(senha) => {setSenha(senha)}}
                placeholder='Digite sua Senha'
                style={styles.input}
            ></TextInput>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginTop: 10, width: 80, marginRight: 22 }}>
              <Button
                title="ENTRAR"
                color="#008000"
                onPress={() => {login( email, senha ),setSenha('')}}
                //onPress={() => {adotar()}}
              />
            </View>
            <View style={{ marginTop: 10, width: 120 }}>
              <Button
                title="Cadastre-se"
                color="#0080FF"
                onPress={() => Alert.alert(email)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0E68C',
    },
    logo: {
      height: 120,
      width: 300,
      marginBottom: 50,
    },
    botao: {
      height: 500,
      width: 200,
      marginTop: 200,
      color: '#008000',
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
      }
  
  });
  
  