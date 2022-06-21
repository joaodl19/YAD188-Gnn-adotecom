import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, TextInput, SafeAreaView, View, Image, Alert, Picker, useWindowDimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { API_URL } from '@env';

import DatePicker from 'react-native-datepicker'


export default function PerfilPet({ route, navigation }) {

  const host_api = API_URL;
  const window = useWindowDimensions();
  const { id_pet, id_cliente, tipo_cliente, id_ong } = route.params
  const [cliente, setCliente] = useState([]);
  const [pet, setPet] = useState([]);
  const [isLoading, setLoading] = useState(false)
  const [nome, setNome] = useState(pet.ds_nome)
  const [dtNascimento, setDtNascimento] = useState(pet.dt_nascimento)
  const [raca, setRaca] = useState(pet.ds_raca)
  const [genero, setGenero] = useState(pet.ds_genero)
  const [observacoes, setObs] = useState(pet.ds_obs)
  const [errorRaca, setErrorRaca] = useState('')
  const [errorNome, setErrorNome] = useState('')
  const [errorGenero, setErrorGenero] = useState('')
  const [errorDtnascimento, setErrordtNascimento] = useState('')

  const telaHome = () => navigation.navigate('Home')
  const telaQuestionario = () => navigation.navigate('Questionario', { id_cliente: id_cliente, id_ong: id_ong, id_pet: id_pet })

  const getImageSource = () => {
    return `data:image/jpeg;base64,${pet.tx_foto}`
  }

  const perfis = async () => {
    fetch(host_api + '/pet/' + id_pet)
      .then(response => response.json())
      .then(json => {
        setPet(json),
          setLoading(true)
      })
      .catch(error => console.log(error))

  }
  const adotar = async (id_pet, id_cliente) => {
    fetch((host_api + '/adocao'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_pet": id_pet,
        "id_cliente": id_cliente
      })
    }
    )
      .then(() => {
        Alert.alert("Pedido de Adocao Criado, preencha o questionario");
        telaQuestionario()
      })
      .catch(error => console.log(error)
      )

  }
  const validar = () => {
    let error = false

    setErrordtNascimento('')
    setErrorNome('')
    setErrorRaca('')
    setErrorGenero('')

    if (dtNascimento == '') {
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
    if (cep == '') {
      setErrorRaca("Preencha a raça")
      error = true
    }
    return !error
  }



  const atualizar = (id_pet) => {
    if (validar()) {
      fetch(host_api + '/pet/' + id_pet, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "ds_nome": nome,
          "ds_raca": raca,
          "dt_nascimento_fundacao": dtNascimento,
          "ds_genero": genero,
          "ds_obs": observacoes
        })
      }

      )
        //.then(response => response.json())
        .then(Alert.alert("Cadastro Atualizado Com Sucesso!"),
          telaHome())
        .catch(error => { Alert.alert("Cadastro incompleto"); console.log(error) })
    } else { Alert.alert("Cadastro incompleto , preencha os campos obrigatórios"); console.log() }

  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    item: {
      alignItems: 'center',
      backgroundColor: '#c0c0c0',
      height: window.height * 0.059,
      width: window.width * 0.670,
      marginLeft: window.width * 0.290,
      marginTop: window.width * 0.005,
      flexDirection: 'row',
      borderRadius: window.height * 0.017,
      paddingStart: window.height * 0.010,
      borderColor: 'black',
      borderWidth: 1,
      borderColor: 'transparent'
    },
    botao: {
      height: window.height * 0.059,
      width: window.width * 0.70,
      marginTop: window.height * 0.030,
      borderRadius: window.height * 0.059,
      backgroundColor: 'blue',
      justifyContent: 'center'
    },
    botao2: {
      marginLeft: window.height * 0.220,
      height: window.height * 0.042,
      width: window.width * 0.50,
      marginTop: window.width * 0.005,
      borderRadius: window.width * 0.042,
      backgroundColor: 'green',
      justifyContent: 'center',
      marginBottom: window.width * 0.015
    },
    saudacoes: {
      fontSize: window.width * 0.068,
      marginTop: window.width * 0.010,
      marginBottom: window.width * 0.008,
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign: 'center'

    },
    logo: {
      height: window.height * 0.087,
      width: window.width * 0.637,
      resizeMode: 'center',
      marginBottom: window.height * 0.007,
      marginLeft: window.width * 0.037
    },
    perfil: {
      height: window.height * 0.137,
      width: window.width * 0.287,
      marginLeft: window.width * -0.567,
      borderRadius: window.width * 0.107
    }
  });

  useEffect(() => {
    perfis()
  }, []);


  return (
    <View style={{ width: window.width, height: window.height }}>
      {(isLoading == false)
        ?
        <View style={{ marginTop: window.width * 0.314 }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
        :
        <SafeAreaView style={styles.container}>
          <Image style={styles.logo} source={require('../../assets/LogoT.png')} />
          <Image style={styles.perfil} source={{ uri: getImageSource() }} />
          <TouchableOpacity style={styles.botao2} onPress={() => adotar(id_pet, id_cliente)}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: window.width * 0.060 }}>Adotar</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.saudacoes}>Dados do Pet:</Text>
            <View style={styles.item}>
              <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.046, fontWeight: 'bold', }}>Nome:</Text>
              <TextInput
                value={pet.ds_nome}
                style={{
                  fontSize: window.width * 0.043,
                  width: window.width * 1,
                  fontWeight: 'bold',
                  marginLeft: window.width * 0.175,
                  color: 'black'
                }}
                onChangeText={(value) => { setNome(value); setErrorNome('') }}
                errorMessage={errorNome} />
            </View>

            <Text style={styles.errorMessage}>{errorNome}</Text>

            <View style={styles.item}>
              <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.046, fontWeight: 'bold', }}>Raca: </Text>
              <TextInput
                value={pet.ds_raca}
                style={{
                  fontSize: window.width * 0.043,
                  width: window.width * 1,
                  fontWeight: 'bold',
                  marginLeft: window.width * 0.184,
                  color: 'black'
                }}
                onChangeText={(value) => { setRaca(value); setErrorRaca('') }}
                errorMessage={errorRaca} />
            </View>

            <Text style={styles.errorMessage}>{errorRaca}</Text>

            <View style={styles.item}><Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.046, fontWeight: 'bold', }}>Nascimento: </Text>
              <DatePicker
                date={pet.dt_nascimento}
                mode="date"
                format="YYYY-MM-DD"
                minDate="1920-05-01"
                maxDate="2022-06-30"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: window.width * 0.005,
                    marginLeft: window.width * 0.580
                  },
                  dateInput: {
                    marginLeft: window.width * 0.150,
                    fontWeight: 'bold',
                    fontSize: window.width * 0.045,
                    fontcolor: 'black',
                    color: 'black',
                    borderColor: 'transparent',
                  },
                  dateText: {
                    fontSize: window.width * 0.045,
                    fontWeight: 'bold',
                    color: "black",
                    textAlign: "left",
                    marginStart: window.width * -0.200
                  }
                }}
                onDateChange={(date) => {
                  setDtnasc(date)
                  setErrordtNascimento('')
                }}
                errorMessage={errorDtnascimento}
              />
            </View>

            <Text style={styles.errorMessage}>{errorNome}</Text>

            <View style={styles.item}>
              <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.046, fontWeight: 'bold', }}>Gênero: </Text>
              <TextInput
                value={pet.ds_genero}
                onValueChange={(value) => {
                  setGenero(value)
                  setErrorGenero('')
                }}
                errorMessage={errorGenero}
                style={{
                  fontSize: window.width * 0.043,
                  width: window.width * 1,
                  fontWeight: 'bold',
                  marginLeft: window.width * 0.140,
                  color: 'black'
                }} />
              <Picker

                style={{ height: window.width * 0.270, width: window.width * 1.870, marginStart: window.width * -1.250, color: 'transparent' }}
                onValueChange={(value) => {
                  setGenero(value)
                  setErrorGenero(null)
                }}
                errorMessage={errorGenero}>
                <Picker.Item label="Selecione seu Gênero" />
                <Picker.Item label="Macho" value="Macho" />
                <Picker.Item label="Fêmea" value="Fêmea" />
              </Picker>
            </View>

            <Text style={styles.errorMessage}>{errorGenero}</Text>

            <View style={styles.item}>
              <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.046, fontWeight: 'bold', }}>Status:               {pet.ds_status}
              </Text>
            </View>

            <Text style={styles.errorMessage}>{errorGenero}</Text>

            <View style={styles.item}>
              <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.046, fontWeight: 'bold', }}>Observações:</Text>
              <TextInput style={{
                fontSize: window.width * 0.043,
                width: window.width * 1,
                fontWeight: 'bold',
                marginLeft: window.width * 0.030,
                color: 'black'
              }} value={pet.ds_obs} onChangeText={(value) => setObs(value)} />
            </View>

            {(cliente.ds_tipo_cliente == 'ONG') &&
              <TouchableOpacity style={styles.botao} onPress={() => atualizar()}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: window.width * 0.055 }}>Atualizar Dados</Text>
              </TouchableOpacity>}

            <TouchableOpacity style={styles.botao} onPress={() => telaHome()}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: window.width * 0.068 }}>Retornar para Home</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      }
    </View>
  )
};
