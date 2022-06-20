import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, SafeAreaView, View, Image, TextInput,
  useWindowDimensions, ScrollView, KeyboardAvoidingView, Alert, Picker
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { API_URL } from '@env';
import { TextInputMask } from 'react-native-masked-text';
export default function Perfil1({ route, navigation }) {

  const host_api = API_URL;
  const { cliente } = route.params;
  const window = useWindowDimensions();

  const [nome, setNome] = useState(cliente.ds_nome)
  const [cpfCnpj, setCpfCnpj] = useState(cliente.nr_cpf_cnpj)
  const [dtNascimento, setDtNascimento] = useState(cliente.dt_nascimento_fundacao)
  const [genero, setGenero] = useState(cliente.ds_genero)
  const [telefone, setTelefone] = useState(cliente.nr_telefone)
  const [cep, setCep] = useState(cliente.nr_cep)
  const [logradouro, setLogradouro] = useState(cliente.ds_logradouro)
  const [numero, setNumero] = useState(cliente.ds_numero)
  const [bairro, setBairro] = useState(cliente.ds_bairro)
  const [cidade, setCidade] = useState(cliente.ds_cidade)
  const [tipoCliente, setTipoCliente] = useState(cliente.ds_tipo_cliente)
  const [deficiencia, setDeficiencia] = useState(cliente.ds_deficiencia)
  const [observacoes, setObservacoes] = useState(cliente.ds_obs)
  const [email, setEmail] = useState(cliente.ds_email)
  const [errorNome, setErrorNome] = useState('')
  const [errorEmail, setErrorEmail] = useState(null)
  const [errordtNascimento, setErrordtNascimento] = useState('')
  const [errorCep, setErrorCep] = useState(null)
  const [errorCpf, setErrorCpf] = useState(null)
  const [errorTelefone, setErrorTelefone] = useState(null)
  const [errorGenero, setErrorGenero] = useState(null)

  const telaHome = () => navigation.navigate('Home')
  const telaCadastroPet = () => navigation.navigate('CadastroPet', cliente.id_cliente)
  const telaAgendamentos = () => navigation.navigate('AgendamentosOng', cliente.id_cliente)

  const getImageSource = () => {
    return `data:image/jpeg;base64,${cliente.tx_foto}`
  }

  const validar = () => {
    let error = false
    setErrorEmail('')
    setErrorCpf('')
    setErrorTelefone('')
    setErrordtNascimento('')
    setErrorNome('')
    setErrorCep('')
    setErrorGenero('')


    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())) {
      setErrorEmail("Preencha seu e-mail corretamente")
      error = true
    }
    if (email == '') {
      setErrorEmail("Preencha seu e-mail")
      error = true
    }
    const cpnj = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
    if (!cpnj.test(String(cpfCnpj).toLowerCase())) {
      setErrorCpf("Preencha seu CPF/CNPJ corretamente")
      error = true
    }
    if (cpfCnpj == '') {
      setErrorCpf("Preencha seu CPF/CNPJ")
      error = true
    }
    if (telefone == '') {
      setErrorTelefone("Preencha seu telefone")
      error = true
    }
    if (dtNascimento == '') {
      setErrordtNascimento("Preencha sua data de nascimento")
      error = true
    }
    if (nome == '') {
      setErrorNome("Preencha seu nome")
      error = true
    }
    if (genero == '') {
      setErrorGenero("Preencha seu genero")
      error = true
    }
    if (cep == '') {
      setErrorCep("Preencha seu cep")
      error = true
    }
    return !error
  }

  const atualizar = (cpfCnpj) => {
    if (validar()) {
      fetch(host_api + '/cliente/' + cpfCnpj, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "ds_nome": nome,
          "nr_cpf_cnpj": cpfCnpj,
          "dt_nascimento_fundacao": dtNascimento,
          "ds_genero": genero,
          "nr_telefone": telefone,
          "nr_cep": cep,
          "ds_logradouro": logradouro,
          "nr_numero": numero,
          "ds_bairro": bairro,
          "ds_cidade": cidade,
          "ds_deficiencia": deficiencia,
          "ds_obs": observacoes,
          "ds_email": email
        })
      }

      )
        //.then(response => response.json())
        .then(Alert.alert("Cadastro Atualizado Com Sucesso!"),
          telaHome())
        .catch(error => { Alert.alert("Cadastro incompleto"); console.log(error) })
    } else { Alert.alert("Atualização de cadastro com campos sem preenchimento!"); console.log() }

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
      marginLeft: window.width * 0.280,
      marginTop: window.width * 0.005,
      flexDirection: 'row',
      borderRadius: window.height * 0.017,
      paddingStart: window.height * 0.010,
      borderColor: 'black',
      borderWidth: 1,
      borderColor: 'transparent'
    },
    botao: {
      height: window.height * 0.069,
      width: window.width * 0.700,
      marginTop: window.height * 0.029,
      borderRadius: window.height * 0.039,
      backgroundColor: 'blue',
      justifyContent: 'center',
      marginBottom: window.height * 0.039
    },
    botao2: {
      marginLeft: window.height * 0.215,
      height: window.height * 0.050,
      width: window.width * 0.500,
      borderRadius: window.height * 0.039,
      backgroundColor: 'green',
      justifyContent: 'center',
      marginBottom: window.height * 0.012,
      alignItems: 'center',
    },
    botao3: {
      marginLeft: window.height * 0.215,
      height: window.height * 0.050,
      width: window.width * 0.500,
      borderRadius: window.height * 0.039,
      backgroundColor: 'red',
      justifyContent: 'center',
      marginBottom: window.height * 0.012,
      alignItems: 'center'

    },
    saudacoes: {
      fontSize: window.height * 0.037,
      marginTop: window.height * 0.006,
      marginBottom: window.height * 0.012,
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign: 'center'

    },
    logo: {
      height: window.height * 0.097,
      width: window.width * 0.637,
      resizeMode: 'center',
      marginBottom: window.height * 0.017,
      marginLeft: window.width * 0.037
    },
    perfil: {
      height: window.height * 0.137,
      width: window.width * 0.287,
      marginLeft: window.width * -0.567,
      borderRadius: window.width * 0.137

    },
    responderText: {
      fontSize: window.height * 0.028,
      color: 'white',
      marginLeft: window.height * 0.001,
      justifyContent: 'center',
      textAlign: 'center'
    },
    botaoResponder: {
      marginTop: window.height * 0.018,
      marginBottom: window.height * 0.018,
      justifyContent: 'center',
      textAlign: 'center',
      height: window.height * 0.066,
      width: window.width * 0.686,
      borderRadius: window.width * 0.086,
      backgroundColor: '#000080'
    },
    errorMessage: {
      alignSelf: "flex-start",
      marginLeft: window.width * 0.366,
      color: "#f00",
      fontSize: window.width * 0.032,
    }
  });


  useEffect(() => {
  }, []);

  return (

    <ScrollView>
      <KeyboardAvoidingView
        //behavior={Platform.OS == "android" ? "padding" : "height"}
        keyboardVerticalOffset={80}>
        <SafeAreaView style={styles.container}>

          <Image style={styles.logo} source={require('../../assets/LogoT.png')} />

          <Image style={styles.perfil} source={{ uri: getImageSource() }} />
          {(tipoCliente == 'ONG') &&
            <TouchableOpacity style={styles.botao2} onPress={() => telaCadastroPet()}>
              <Text style={styles.responderText}>Cadastrar Pet</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity style={styles.botao3} onPress={() => telaAgendamentos()}>
            <Text style={styles.responderText}>Agendamentos</Text>
          </TouchableOpacity>


          <Text style={styles.saudacoes}>Dados do cliente</Text>


          <View style={styles.item} >
            <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.050, fontWeight: 'bold', }}>Nome: </Text>
            <TextInput
              value={nome}
              onChangeText={(nome) => {
                setNome(nome)
                setErrorNome('')
              }}
              errorMessage={errorNome}
              style={{
                fontSize: window.width * 0.045,
                width: window.width * 1,
                fontWeight: 'bold',
                marginLeft: window.width * 0.170,
                color: 'black'
              }} />
          </View>
          <Text style={styles.errorMessage}>{errorNome}</Text>

          {tipoCliente == 'PF' &&
            <View style={styles.item} >
              <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.050, fontWeight: 'bold', }}>CPF: </Text>
              <TextInputMask
                type={'cpf'}
                value={cpfCnpj}
                onChangeText={(cpfCnpj) => {
                  setCpfCnpj(cpfCnpj)
                  setErrorCpf('')
                }}
                errorMessage={errorCpf}
                style={{
                  fontSize: window.width * 0.045,
                  width: window.width * 1,
                  fontWeight: 'bold',
                  marginLeft: window.width * 0.215,
                  color: 'black'
                }}

                keyboardType="phone-pad"
                returnKeyType="done"

              />

            </View>
          }
          {tipoCliente == 'PF' && <Text style={styles.errorMessage}>{errorCpf}</Text>}

          {tipoCliente == 'ONG' &&
            <View style={styles.item} >
              <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.050, fontWeight: 'bold', }}>CNPJ: </Text>
              <TextInputMask
                type={'cnpj'}
                value={cpfCnpj}
                onChangeText={(cpfCnpj) => {
                  setCpfCnpj(cpfCnpj)
                  setErrorCpf('')
                }}
                errorMessage={errorCpf}
                style={{
                  fontSize: window.width * 0.045,
                  width: window.width * 1,
                  fontWeight: 'bold',
                  marginLeft: window.width * 0.185,
                  color: 'black'
                }}

                keyboardType="phone-pad"
                returnKeyType="done"
              />
            </View>
          }
          {tipoCliente == 'ONG' && <Text style={styles.errorMessage}>{errorCpf}</Text>}

          {tipoCliente == 'PF' &&
            <View style={styles.item} >
              <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.050, fontWeight: 'bold', }}>Nascimento: </Text>

              <DatePicker
                date={dtNascimento}
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
                    marginLeft: window.width * 0.540
                  },
                  dateInput: {
                    marginLeft: window.width * 0.065,
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
                    marginStart: window.width * -0.099
                  }
                  // ... You

                }}
                onDateChange={(dtNascimento) => {
                  setDtNascimento(dtNascimento)
                  setErrordtNascimento('')
                }}
                errorMessage={errordtNascimento}
              />
            </View>}

          {tipoCliente == 'PF' && <Text style={styles.errorMessage}>{errordtNascimento}</Text>}

          {tipoCliente == 'ONG' &&
            <View style={styles.item} >
              <Text style={{ marginLeft: window.width * -0.308, fontSize: window.width * 0.050, fontWeight: 'bold', }}>Fundação: </Text>

              <DatePicker
                date={dtNascimento}
                mode="date"
                //placeholder={(tipoCliente == 'ONG') ? 'Data Fundação' : 'Data Nascimento'}
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
                    marginLeft: window.width * 0.570
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
                    marginStart: window.width * -0.090
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(dtNascimento) => {
                  setDtNascimento(dtNascimento)
                  setErrordtNascimento('')
                }}
                errorMessage={errordtNascimento}

              />

            </View>}
          {tipoCliente == 'ONG' && <Text style={styles.errorMessage}>{errordtNascimento}</Text>}

          {tipoCliente == 'PF' &&
            <View style={styles.item} >
              <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.050, fontWeight: 'bold', }}>Gênero: </Text>
              <TextInput
                value={genero}
                onValueChange={(genero) => {
                  setGenero(genero)
                  setErrorGenero('')
                }}
                errorMessage={errorGenero}
                style={{
                  fontSize: window.width * 0.045,
                  width: window.width * 1,
                  fontWeight: 'bold',
                  marginLeft: window.width * 0.160,
                  color: 'black'
                }} />

              <Picker

                style={{ height: window.width * 0.270, width: window.width * 0.870, marginStart: window.width * -1.250, color: 'transparent' }}
                onValueChange={(genero) => {
                  setGenero(genero)
                  setErrorGenero('')
                }}
                errorMessage={errorGenero}
              >
                <Picker.Item label="Alterar" />
                <Picker.Item label="Masculino" value="Masculino" />
                <Picker.Item label="Feminino" value="Feminino" />
              </Picker>
            </View>}

          {tipoCliente == 'PF' && <Text style={styles.errorMessage}>{errorGenero}</Text>}


          <View style={styles.item} >
            <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.050, fontWeight: 'bold', }}>Telefone: </Text>
            <TextInput
              type='number'
              value={telefone.toString()}
              onChangeText={(telefone) => {
                setTelefone(telefone)
                setErrorTelefone('')
              }}
              errorMessage={errorTelefone}
              keyboardType="phone-pad"
              returnKeyType="done"
              style={{
                fontSize: window.width * 0.045,
                width: window.width * 1,
                fontWeight: 'bold',
                marginLeft: window.width * 0.125,
                color: 'black'
              }} />
          </View>

          <Text style={styles.errorMessage}>{errorTelefone}</Text>


          <View style={styles.item} >
            <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.050, fontWeight: 'bold', }}>Cep: </Text>
            <TextInputMask
              type='zip-code'
              value={cep}
              onChangeText={(cep) => {
                setCep(cep)
                setErrorCep('')
              }}
              errorMessage={errorCep}
              style={{
                fontSize: window.width * 0.045,
                width: window.width * 1,
                fontWeight: 'bold',
                marginLeft: window.width * 0.235,
                color: 'black'
              }}

            />
          </View>

          <Text style={styles.errorMessage}>{errorCep}</Text>

          <View style={styles.item} >
            <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.050, fontWeight: 'bold', }}>Endereço: </Text>
            <TextInput

              value={logradouro}
              onChangeText={(logradouro) => { setLogradouro(logradouro) }}
              style={{
                fontSize: window.width * 0.045,
                width: window.width * 1,
                fontWeight: 'bold',
                marginLeft: window.width * 0.115,
                color: 'black'
              }} />

          </View>
          
          {tipoCliente == 'PF' && <Text style={styles.errorMessage}></Text>}

          <View style={styles.item} >
            <Text style={{ marginLeft: -120, fontSize: 18, fontWeight: 'bold', }}>Observações: </Text>
            <TextInput
              value={observacoes}
              onChangeText={(observacoes) => { setObservacoes(observacoes) }}
              style={{
                fontSize: window.width * 0.045,
                width: window.width * 1,
                fontWeight: 'bold',
                marginLeft: window.width * 0.048,
                color: 'black'
              }} />
          </View>
          <Text style={styles.errorMessage}></Text>

          <View style={styles.item} >
            <Text style={{ marginLeft: window.width * -0.314, fontSize: window.width * 0.050, fontWeight: 'bold', }}>E-mail: </Text>
            <TextInput
              value={email}
              onChangeText={(email) => {
                setEmail(email)
                setErrorEmail('')
              }}
              keyboardType="email-address"
              errorMessage={errorEmail}
              style={{
                fontSize: window.width * 0.045,
                width: window.width * 1,
                fontWeight: 'bold',
                marginLeft: window.width * 0.180,
                color: 'black'
              }} />
          </View>

          <Text style={styles.errorMessage}>{errorEmail}</Text>

          <TouchableOpacity
            style={{ marginBottom: window.height * 0.002, marginTop: window.height * 0.006 }}
            onPress={() => atualizar(cpfCnpj)}>
            <View style={styles.botaoResponder}>
              <Text style={styles.responderText}>Atualizar Dados</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botao} onPress={() => telaHome()}>
            <Text style={styles.responderText}>Retornar ao Menu</Text>
          </TouchableOpacity>

        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>

  )
};

