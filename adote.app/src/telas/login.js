import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  Button,
  useWindowDimensions,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { AsyncStorage } from 'react-native';
import { API_URL } from '@env';

export default function Login({ navigation }) {

  const host_api = API_URL
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')

  const telaHome = () => navigation.navigate('Home', { cpf: cpf });
  const telaCadastro = () => navigation.navigate('Cadastro');

  //heith 782.4
  //width 384
  const _storeData = async () => {
    try {
      await AsyncStorage.setItem('@session', cpf)
    } catch (e) {
      // saving error
    }
  }
  const login = (cpf, senha) => {
    fetch((host_api + '/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "cpf": cpf,
        "senha": senha
      })
    }
    )
      .then(response => response.json())
      .then(json => {
        if (json.codigo == 1) {
          telaHome(cpf);
          _storeData();
        } else {
          Alert.alert('LOGIN ERRO \n' + json.mensagem)
        }
      })
      .catch(error => console.log(error))
  }

  const window = useWindowDimensions();
  const styles = StyleSheet.create({

    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    logo: {
      height: window.height * 0.065,
      width: window.width * 0.785,
      marginBottom: window.height * 0.014,
    },
    botao: {
      height: window.height * 0.765,
      width: window.width * 0.685,
      marginTop: window.height * 0.014,
      color: '#008000',
    },
    input: {
      backgroundColor: '#c0c0c0',
      height: window.height * 0.064,
      width: window.width * 0.810,
      marginTop: window.height * 0.014,
      borderRadius: window.height * 0.015,
      fontSize: window.height * 0.044,
      paddingStart: window.width * 0.025,
      borderColor: '#000080',
      color: 'black',

    }

  });

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require('../../assets/LogoT.png')} />
        <Text style={{ marginLeft: window.width * 0.092, alignItems: 'center', justifyContent: 'center', fontSize: window.height * 0.058, fontWeight: 'bold', color: '#0b3a5c' }}>Bem-Vindo</Text>
      </View>
      <View>
        <TextInput class="teste"
          value={cpf}
          onChangeText={(cpf) => { setCpf(cpf) }}
          style={styles.input}
          placeholder='CPF/CNPJ'
          placeholderTextColor="white"
        ></TextInput>
        <TextInput
          value={senha}
          onChangeText={(senha) => { setSenha(senha) }}
          placeholder='Senha'
          placeholderTextColor="white"
          secureTextEntry={true}
          style={styles.input}
        ></TextInput>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableWithoutFeedback style={{ borderRadius: 20 }}
            onPress={() => { telaCadastro() }}>
            <View style={{ backgroundColor: '#696969', height: window.height * 0.064, width: window.width * 0.575, borderRadius: 12 }}>
              <Text style={{ paddingStart: window.width * 0.012, paddingStart: window.width * 0.025, fontSize: window.height * 0.042, color: 'white' }}>Registre-se</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback style={{}}
            onPress={() => { login(cpf, senha), setSenha('') }}>
            <View style={{ backgroundColor: '#0b3a5c', height: window.height * 0.064, width: window.width * 0.285, borderRadius: 12, marginLeft: -20 }}>
              <Text style={{ paddingStart: window.width * 0.012, paddingStart: window.width * 0.025, fontSize: window.height * 0.042, color: 'white' }}>Entrar</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}



