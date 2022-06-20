import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, TextInput, SafeAreaView, useWindowDimensions, View, Image, Alert, Picker } from 'react-native';
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

  useEffect(() => {
    perfis()
  }, []);

  return (
    <View style={{ width: window.width, height: window.height }}>
      {(isLoading == false)
        ?
        <View style={{ marginTop: 300 }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
        :
        <SafeAreaView style={styles.container}>
          <Image style={styles.logo} source={require('../../assets/LogoT.png')} />
          <Image style={styles.perfil} source={{ uri: getImageSource() }} />
          <TouchableOpacity style={styles.botao2} onPress={() => adotar(id_pet, id_cliente)}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 22 }}>Adotar</Text>
          </TouchableOpacity>
          <Text style={styles.saudacoes}>Dados do Pet:</Text>

          <View style={styles.item}>
            <Text style={{ marginLeft: -120, fontSize: 17, fontWeight: 'bold', }}>Nome:</Text>
            <TextInput
              value={pet.ds_nome}
              style={{
                fontSize: 16,
                width: '100%',
                fontWeight: 'bold',
                marginLeft: 68,
                color: 'black'
              }}
              onChangeText={(value) => { setNome(value); setErrorNome('') }}
              errorMessage={errorNome} />
          </View>

          <Text style={styles.errorMessage}>{errorNome}</Text>

          <View style={styles.item}>
            <Text style={{ marginLeft: -120, fontSize: 17, fontWeight: 'bold', }}>Raca: </Text>
            <TextInput
              value={pet.ds_raca}
              style={{
                fontSize: 16,
                width: '100%',
                fontWeight: 'bold',
                marginLeft: 68,
                color: 'black'
              }}
              onChangeText={(value) => { setRaca(value); setErrorRaca('') }}
              errorMessage={errorRaca} />
          </View>

          <Text style={styles.errorMessage}>{errorRaca}</Text>

          <View style={styles.item}><Text style={{ marginLeft: -120, fontSize: 17, fontWeight: 'bold', }}>Nascimento: </Text>
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
                  top: 4,
                  marginLeft: 210
                },
                dateInput: {
                  marginLeft: 20,
                  fontcolor: 'black',
                  borderColor: 'transparent',
                },
                dateText: {
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: "black",
                  textAlign: "left",
                  marginStart: -39
                }
              }}
              onDateChange={(date) => {
                setDtnasc(date)
                setErrordtNascimento('')
              }}
              errorMessage={errorDtnascimento}
            />
          </View>

          <Text style={styles.errorMessage}>{errorDtnascimento}</Text>

          <View style={styles.item}>
            <Text style={{ marginLeft: -120, fontSize: 17, fontWeight: 'bold', }}>Gênero: </Text>
            <TextInput
              value={pet.ds_genero}
              onValueChange={(value) => {
                setGenero(value)
                setErrorGenero('')
              }}
              errorMessage={errorGenero}
              style={{
                fontSize: 16,
                width: '100%',
                fontWeight: 'bold',
                marginLeft: 52,
                color: 'black'
              }} />
            <Picker
              selectedValue={pet.ds_genero}
              style={{
                fontSize: 16,
                width: '100%',
                fontWeight: 'bold',
                marginLeft: 60,
                color: 'black'
              }}
              onValueChange={(selectedValue) => {
                setGenero(selectedValue)
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
            <Text style={{ marginLeft: -120, fontSize: 16, fontWeight: 'bold', }}>Status:                {pet.ds_status}
            </Text>
          </View>

          <Text style={styles.errorMessage}>{errorGenero}</Text>

          <View style={styles.item}>
            <Text style={{ marginLeft: -120, fontSize: 17, fontWeight: 'bold', }}>Observações:</Text>
            <TextInput style={{
              fontSize: 16,
              width: '100%',
              fontWeight: 'bold',
              marginLeft: 13,
              color: 'black'
            }} value={pet.ds_obs} onChangeText={(value) => setObs(value)} /></View>

          {(cliente.ds_tipo_cliente == 'ONG') &&
            <TouchableOpacity style={styles.botao} onPress={() => atualizar()}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 19 }}>Atualizar Dados</Text>
            </TouchableOpacity>}

          <TouchableOpacity style={styles.botao} onPress={() => telaHome()}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 23 }}>Retornar para Home</Text>
          </TouchableOpacity>
        </SafeAreaView>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  item: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 46,
    width: 250,
    marginLeft: 110,
    marginTop: 3,
    flexDirection: 'row',
    backgroundColor: '#c0c0c0',
    borderRadius: 5,
    paddingStart: 10,
    borderColor: 'black',
    borderWidth: 0
  },
  dados: {
    marginLeft: 15,
    fontSize: 18,
    backgroundColor: 'black'
  },
  botao: {
    height: 45,
    width: '70%',
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  botao2: {
    marginLeft: 180,
    height: 30,
    width: '50%',
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
  TextInput: {
    paddingLeft: 15,
    height: 25,
    width: '70%',
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: 'white'

  },
  saudacoes: {
    fontSize: 26,
    marginTop: 2,
    marginBottom: 5,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center'
  },
  fontdados: {
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
    height: 110,
    width: 110,
    marginLeft: -220,
    borderRadius: 45
  },
  topo: {
    height: 100,
    marginTop: 20
  },

});