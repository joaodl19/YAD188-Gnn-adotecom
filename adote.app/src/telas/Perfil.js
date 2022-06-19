import React, {useState,useEffect} from 'react';
import {StyleSheet,Text, SafeAreaView, View,Image,TextInput,
TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView,Alert,Picker} from 'react-native';
import {TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { API_URL } from '@env';
import {TextInputMask} from 'react-native-masked-text';
export default function Perfil1({route, navigation}){

  const host_api = API_URL;
  const {cliente} = route.params;

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
  const [senha, setSenha] = useState(cliente.ds_senha)
  const [errorNome, setErrorNome] = useState('')
  const [errorEmail, setErrorEmail] = useState(null)
  const [errordtNascimento, setErrordtNascimento] = useState('')
  const [errorCep, setErrorCep] = useState(null)
  const [errorCpf, setErrorCpf] = useState(null)
  const [errorSenha, setErrorSenha] = useState('')
  const [errorTelefone, setErrorTelefone] = useState(null)
  const [errorGenero, setErrorGenero] = useState(null)

  const telaHome = () => navigation.navigate('Home')
  const telaCadastroPet = () => navigation.navigate('CadastroPet',cliente.id_cliente)
  const telaAgendamentos = () => navigation.navigate('AgendamentosOng', cliente.id_cliente)
  
  const getImageSource = () => {
    return `data:image/jpeg;base64,${cliente.tx_foto}`
  }

  const validar = () => {
    let error = false
    setErrorEmail('')
    setErrorCpf('')
    setErrorSenha('')
    setErrorTelefone('')
    setErrordtNascimento('')
    setErrorNome('')
    setErrorCep('')
    setErrorGenero('')
    
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(email).toLowerCase())){
      setErrorEmail("Preencha seu e-mail corretamente")
      error = true
    }
    if (email == ''){  
    setErrorEmail("Preencha seu e-mail")
      error = true
    }
    const cpnj = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
    if (!cpnj.test(String(cpfCnpj).toLowerCase())){
      setErrorCpf("Preencha seu CPF/CNPJ corretamente")
      error = true
        }
    if (cpfCnpj == ''){
      setErrorCpf("Preencha seu CPF/CNPJ")
      error = true
    }
    if (telefone == ''){
      setErrorTelefone("Preencha seu telefone")
      error = true
    }
    if (dtNascimento == ''){
            setErrordtNascimento("Preencha sua data de nascimento")
            error = true
    }
    if (nome == ''){
            setErrorNome("Preencha seu nome")
            error = true
    }
    if (senha == ''){
            setErrorSenha("Preencha a senha")
            error = true
    }
    if (genero == ''){
            setErrorGenero("Preencha seu genero")
            error = true
    }
    if (cep == ''){
            setErrorCep("Preencha seu cep")
            error = true
    }
    return !error
  }
  
  const atualizar = (cpfCnpj)=>{
    if (validar()){
     fetch(host_api+'/cliente/'+cpfCnpj,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "ds_nome": nome,
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
                                    "ds_email": email,
                                    "ds_senha": senha,
                                     })
                                  }
                                   
            )
            //.then(response => response.json())
            .then(Alert.alert("Cadastro Atualizado Com Sucesso!"),
                            telaHome())
            .catch(error => {Alert.alert("Cadastro incompleto");console.log(error)})
                                }else {Alert.alert("Atualização de cadastro com campos sem preenchimento!");console.log()}           
                              
            }
    
  useEffect(() => {
  },[]);

  return(

    <ScrollView>
        <KeyboardAvoidingView        
    //behavior={Platform.OS == "android" ? "padding" : "height"}
    keyboardVerticalOffset={80}>
    <SafeAreaView style={styles.container}>

      <Image style={styles.logo} source={require('../../assets/LogoT.png')}/>
    
      <Image style={styles.perfil} source={{uri: getImageSource()}}/>
      {(tipoCliente == 'ONG') &&
        <TouchableOpacity style={styles.botao2}  onPress={()=>telaCadastroPet()}>
            <Text style={styles.responderText}>Cadastrar Pet</Text>
        </TouchableOpacity>      
      }
      <TouchableOpacity style={styles.botao3}  onPress={()=>telaAgendamentos()}>
           <Text style={styles.responderText}>Agendamentos</Text>
      </TouchableOpacity>    

      <Text style={styles.saudacoes}>Dados do cliente</Text>  
            
              
              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Nome: </Text>
              <TextInput
              value={nome}
              onChangeText={(nome) => {setNome(nome)
                setErrorNome('')}}
                errorMessage={errorNome}   
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 68,
  color: 'black'}}/>
              </View>
              <Text style={styles.errorMessage}>{errorNome}</Text>

              {tipoCliente == 'PF' &&
              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>CPF: </Text>
                <TextInputMask
                        type={'cpf'}
                        value={cpfCnpj}
                        onChangeText={(cpfCnpj) => {setCpfCnpj(cpfCnpj)
                          setErrorCpf('')}}
                          errorMessage={errorCpf} 
                        style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 82,
  color: 'black'}}
                        
                        keyboardType="phone-pad"  
                        returnKeyType="done"  
                          
                />
                
                 </View>
                 } 
                 {tipoCliente == 'PF' &&<Text style={styles.errorMessage}>{errorCpf}</Text>}

                {tipoCliente == 'ONG' &&
                <View style={styles.item} >
                <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>CNPJ: </Text>
                <TextInputMask
                        type={'cnpj'}
                        value={cpfCnpj}
                        onChangeText={(cpfCnpj) => {setCpfCnpj(cpfCnpj)
                          setErrorCpf('')}}
                          errorMessage={errorCpf} 
                        style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 70,
  color: 'black'}}
                        
                        keyboardType="phone-pad"  
                        returnKeyType="done" 
                  />
                </View>
                }
                {tipoCliente == 'ONG' &&<Text style={styles.errorMessage}>{errorCpf}</Text>}
              
              {tipoCliente == 'PF' &&
              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Nascimento: </Text>
              
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
            top: 4,
            marginLeft: 200
          },
          dateInput: {
            
            marginLeft: 28,
            fontWeight: 'bold',
            fontSize: 20,
            fontcolor: 'black',
            color: 'black',
            borderColor: 'transparent',

          },
          dateText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: "black",
            textAlign: "left",
            marginStart: -36
            }
          // ... You
         
        }}
        onDateChange={(dtNascimento) => {setDtNascimento(dtNascimento)
          setErrordtNascimento('')}}
          errorMessage={errordtNascimento}
      />  
                </View>}

                {tipoCliente == 'PF' &&<Text style={styles.errorMessage}>{errordtNascimento}</Text>}

                {tipoCliente == 'ONG' &&
              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Fundação: </Text>
              
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
            top: 4,
            marginLeft: 220
          },
          dateInput: {
            marginLeft: 68,
            fontWeight: 'bold',
            fontSize: 20,
            fontcolor: 'black',
            color: 'black',
            borderColor: 'transparent',
          },
          dateText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: "black",
            textAlign: "left",
            marginStart: -36
            }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(dtNascimento) => {setDtNascimento(dtNascimento)
          setErrordtNascimento('')}}
          errorMessage={errordtNascimento}
         
      />  
        
            </View>}
            {tipoCliente == 'ONG' &&<Text style={styles.errorMessage}>{errordtNascimento}</Text>}

            {tipoCliente == 'PF' &&
              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Gênero: </Text>
              <TextInput
              value={genero}
              onValueChange={(genero) => {setGenero(genero) 
                setErrorGenero('')}}
                errorMessage={errorGenero}
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 60,
  color: 'black'}}/>

            <Picker 
      
        style={{height: 50, width: 500, marginStart: -230 , color: 'transparent' }}
        onValueChange={(genero) => {setGenero(genero) 
          setErrorGenero('')}}
          errorMessage={errorGenero}
        >
        <Picker.Item label="Alterar"/>
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Feminino" value="Feminino" />
      </Picker>
      </View> }

      {tipoCliente == 'PF' &&<Text style={styles.errorMessage}>{errorGenero}</Text>}
              

              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Telefone: </Text>
              <TextInput
              type='number'
              value={telefone}
              onChangeText={(telefone) => {setTelefone(telefone)
                setErrorTelefone('')}}
                errorMessage={errorTelefone}
                keyboardType="phone-pad"  
                        returnKeyType="done" 
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 50,
  color: 'black'}}/>
              </View>

              <Text style={styles.errorMessage}>{errorTelefone}</Text>                    
              
             
              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Cep: </Text>
              <TextInputMask
                        type='zip-code'
                        value={cep}
                        onChangeText={(cep) => {setCep(cep)
                        setErrorCep('')}}
                        errorMessage={errorCep}   
                        style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 87,
  color: 'black'}}
                        
                />
                </View>

                <Text style={styles.errorMessage}>{errorCep}</Text>   
              
              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Endereço: </Text>
              <TextInput
              
              value={logradouro}
              onChangeText={(logradouro) => {setLogradouro(logradouro)}}
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 46,
  color: 'black'}}/>
              
              </View>

              <Text style={styles.errorMessage}></Text>

              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Cidade: </Text>
              <TextInput
              value={cidade}
              onChangeText={(cidade) => {setCidade(cidade)}}
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 65,
  color: 'black'}}/>
              </View>

              <Text style={styles.errorMessage}></Text>

              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Bairro: </Text>
              <TextInput
              value={bairro}
              onChangeText={(bairro) => {setBairro(bairro)}}
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 73,
  color: 'black'}}/>
              </View>

              <Text style={styles.errorMessage}></Text>

              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Número: </Text>
              <TextInput
              type='number'
              value={numero}
              onChangeText={(numero) => {setNumero(numero)}}
              keyboardType="phone-pad"  
              returnKeyType="done" 
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 58,
  color: 'black'}}/>
              </View>

              <Text style={styles.errorMessage}></Text>

              {tipoCliente == 'PF' &&   
        <View style={styles.item} >
          <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Deficiencia: </Text>
          <TextInput
              value={deficiencia}
              onValueChange={(deficiencia) => {setDeficiencia(deficiencia)}}
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 33,
  color: 'black'}}/>
          <Picker        
          style={{width: 500, marginStart: -230 , color: 'transparent'}}
          onValueChange={(deficiencia) => {setDeficiencia(deficiencia) }}>
          <Picker.Item label="Deficiencia"/>
          <Picker.Item label="SIM" value="SIM" />
          <Picker.Item label="NÃO" value="NÃO" />
        </Picker>
        </View>                     
                        }

              {tipoCliente == 'PF' &&   <Text style={styles.errorMessage}></Text>}

              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Observações: </Text>
              <TextInput
              value={observacoes}
              onChangeText={(observacoes) => {setObservacoes(observacoes)}}
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 21,
  color: 'black'}}/>
              </View>            

              <Text style={styles.errorMessage}></Text>

              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>E-mail: </Text>
              <TextInput
              value={email}
              onChangeText={(email) => {
                setEmail(email)
                setErrorEmail('')}}
                keyboardType="email-address"
                errorMessage={errorEmail}    
              style={{fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 70,
  color: 'black'}}/>
              </View>    

              <Text style={styles.errorMessage}>{errorEmail}</Text>

              <View style={styles.item} >
              <Text style={{marginLeft: -120, fontSize: 18, fontWeight: 'bold',}}>Senha: </Text>

              <TextInput
                        value={senha}
                        onChangeText={(senha) => {setSenha(senha)
                        setErrorSenha('')}}
                        secureTextEntry={true}
                        errorMessage={errorSenha} 
                        style={{fontSize: 19,
                          width: '100%',
                          fontWeight: 'bold',
                          marginLeft: 70,
                          color: 'black'}}
                /></View>

              <Text style={styles.errorMessage}>{errorSenha}</Text>
                

              <TouchableOpacity 
                        style={{marginBottom: 1,marginTop: 3}}
                        onPress={() => atualizar(cpfCnpj)}>
                        <View style={styles.botaoResponder}>
                                <Text style={styles.responderText}>Atualizar Dados</Text>
                        </View> 
                </TouchableOpacity>
                            
          <TouchableOpacity style={styles.botao}  onPress={()=>telaHome()}>
           <Text style={styles.responderText}>Retornar ao Menu</Text>
          </TouchableOpacity>
          
    
    </SafeAreaView>
    </KeyboardAvoidingView>
    </ScrollView>
    
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  item:{
    alignItems: 'center',
    backgroundColor: '#c0c0c0',
    borderRadius: 20,
    height: 45,
    width: 240,
    marginLeft: 110,
    marginTop: 1,
    flexDirection: 'row',
    borderRadius: 5,
    paddingStart: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderColor: 'transparent',
},
  dados:{
    marginLeft: 15,
    fontSize: 18,
    backgroundColor: 'black'
  },
  botao: {
    height: 60,
    width: '70%',
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    marginBottom: 30,
  },
  botao2: {
    marginLeft: 170,
    height:40,
    width: '50%',
    borderRadius: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
  },
  botao3: {
    marginLeft: 170,
    height:40,
    width: '50%',
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    marginBottom: 10,
    alignItems: 'center',
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
    fontSize: 26,
    marginTop: 6,
    marginBottom: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign:'center'
},
fontdados:{
  fontSize: 19,
  width: '100%',
  fontWeight: 'bold',
  marginLeft: 70,
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
      responderText:{
        fontSize: 22,
        marginTop: 0,
        color: 'white',
        marginLeft: 10 ,
        justifyContent: 'center',
        textAlign: 'center'
        },
        botaoResponder:{
        marginTop:10,   
        marginLeft: 0,
        marginBottom: 10,
        justifyContent: 'center',
        textAlign:'center',
        height: 55,
        width: 260,
        borderRadius: 30,
        backgroundColor: '#000080'
        },
        containerMask: {
          flexDirection: "row",
          marginBottom: 5,
          marginLeft: 10,
          marginRight: 10
        },
        errorMessage: {
          alignSelf: "flex-start",
          marginLeft: 140,
          color: "#f00",
          fontSize: 12
        }  
});