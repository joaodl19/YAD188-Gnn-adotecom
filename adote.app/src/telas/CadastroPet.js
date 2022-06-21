import React, { useState, useEffect } from 'react';
import {
  TextInput, Text, Image, useWindowDimensions, KeyboardAvoidingView,
  StyleSheet, Alert, SafeAreaView, ScrollView, View, Picker
} from 'react-native';
import { Statusbar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import UploadImage from './components/UploadImage'
import { API_URL } from '@env';
import DatePicker from 'react-native-datepicker'
import { TextInputMask } from 'react-native-masked-text';

export default function CadastroPet({ route, navigation }) {

  const host_api = API_URL;
  const id_cliente = route.params;
  const window = useWindowDimensions();
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
    setErrorGenero('')

    if (raca == '') {
      setErrorRaca("Preencha a Raça do Pet")
      error = true
    }
    if (dtnascimento == '') {
      setErrordtNascimento("Preencha a data de nascimento")
      error = true
    }
    if (nome == '') {
      setErrorNome("Preencha o nome")
      error = true
    }

    if (genero == '') {
      setErrorGenero("Preencha o genero")
      error = true
    }

    return !error
  }

  const cadastropet = () => {
    if (validar()) {
      fetch(host_api + '/pet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "ds_nome": nome,
          "dt_nascimento": dtnascimento,
          "ds_raca": raca,
          "ds_genero": genero,
          "id_ong": id_cliente,
          "ds_obs": obs,
          "tx_foto": foto
        })
      }
      )
        .then(() => {
          Alert.alert("Pronto! Obrigado por cadastrar seu Pet."),
          telaPerfil()
        })
        .catch(error => console.log(error))
      //telaHome(cpf))
    } else { Alert.alert("Cadastro incompleto , preencha os campos obrigatórios"); console.log() }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      backgroundColor: 'white',
      height: window.height * 0.918,
      width: window.width * 1.000
    },
    botao: {
      marginTop: window.height * 0.048,
      marginBottom: window.height * 0.045,
      height: window.height * 0.068,
      width: window.height * 0.345,
      borderRadius: window.height * 0.025,
      backgroundColor: '#000080'

    },
    TextInput: {
      borderWidth: 0.5,
      backgroundColor: '#c0c0c0',
      justifyContent: 'center',
      alignItems: 'center',
      height: window.height * 0.064,
      width: window.width * 0.920,
      marginTop: window.height * 0.012,
      borderRadius: window.height * 0.012,
      fontSize: window.height * 0.024,
      paddingStart: window.height * 0.024,
      borderColor: 'transparent',

    },
    saudacoes: {
      fontSize: window.height * 0.033,
      marginBottom: window.height * 0.015,
      marginLeft: window.height * 0.015,
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign: 'center'
    },
    logo: {
      height: window.height * 0.052,
      width: window.width * 0.548,
      marginStart: window.width * 0.045,
      marginTop: window.height * 0.07,
      marginBottom: window.height * 0.02
    },
    errorMessage: {
      alignSelf: "flex-start",
      marginLeft: window.width * 0.096,
      color: "#f00",
      fontSize: window.width * 0.035
    },
    responderTextbt: {
      fontSize: window.width * 0.080,
      marginTop: window.width * 0.005,
      color: 'white',
      marginLeft: window.width * 0.005,
      justifyContent: 'center',
      textAlign: 'center'
    }

  });


  return (

    <ScrollView>
      <KeyboardAvoidingView
        style={[styles.container]}
        keyboardVerticalOffset={80}>

        <SafeAreaView style={styles.container}>

          <Image style={styles.logo} source={require('../../assets/LogoT.png')} />
          <Text style={styles.saudacoes}>Preencha os campos abaixo para cadastrar o Pet!</Text>

          <TextInput placeholder='Nome do Pet'
            placeholderTextColor="white"
            style={styles.TextInput}
            value={nome}
            onChangeText={(nome) => {
              setNome(nome)
              setErrorNome('')
            }}

            errorMessage={errorNome} />

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
                left: 0,
                top: window.height * 0.005,
                marginLeft: window.width * 0.760,
              },
              placeholderText: {
                fontSize: window.height * 0.025,
                color: "white",
                marginStart: window.width * -0.110,
              },
              dateInput: {
                marginLeft: window.width * -0.370,
                color: 'black',
                top: window.height * 0.001,
                borderColor: 'transparent',
              },
              dateText: {
                fontSize: window.height * 0.024,
                color: "black",
                textAlign: "left",
                marginStart: window.width * -0.255,
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(dtnascimento) => {
              setDtnasc(dtnascimento)
              setErrordtNascimento('')
            }}

          />

          <Text style={styles.errorMessage}>{errorDtnascimento}</Text>


          <TextInput placeholder='Raça'
            placeholderTextColor="white"
            style={styles.TextInput} value={raca}
            onChangeText={(raca) => {
              setRaca(raca)
              setErrorRaca('')
            }}
            errorMessage={errorRaca} />

          <Text style={styles.errorMessage}>{errorRaca}</Text>


          <View style={styles.TextInput} >
            <Picker
              selectedValue={genero}
              placeholder='Gênero'

              style={{ height: window.height * 0.044, width: window.height * 0.434, marginStart: window.height * -0.014, color: 'black' }}
              onValueChange={(genero) => {
                setGenero(genero)
                setErrorGenero(null)
              }}
              errorMessage={errorGenero}>
              <Picker.Item label="Selecione o Sexo" />
              <Picker.Item label="Macho" value="Macho" />
              <Picker.Item label="Fêmea" value="Fêmea" />
            </Picker>
          </View>

          <Text style={styles.errorMessage}>{errorGenero}</Text>


          <TextInput placeholder='Observações...'
            placeholderTextColor="white"
            style={styles.TextInput} value={obs} onChangeText={(obs) => setObs(obs)} />

          <Text style={styles.errorMessage}></Text>

          <View style={{ marginLeft: window.height * -0.064, height: window.height * 0.050, width: window.width * 0.504 }}>
            <UploadImage setProps={setFoto} ></UploadImage>
          </View>
          <TouchableOpacity style={styles.botao} onPress={() => cadastropet()}>
            <Text style={styles.responderTextbt}>Cadastrar</Text>
          </TouchableOpacity>

        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}



