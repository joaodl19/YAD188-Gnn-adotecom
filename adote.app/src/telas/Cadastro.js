import React, {useState,useEffect} from 'react';
import {StyleSheet,
        Text,
        TextInput,
        ScrollView,
        SafeAreaView, 
        Picker,
        View,
        Alert,
        KeyboardAvoidingView, 
        TouchableWithoutFeedback
} from 'react-native';
import { API_URL } from '@env';
import UploadImage from './components/UploadImage'
import {TextInputMask} from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker'

export default function Cadastro({navigation}) {
  
    const [nome, setNome] = useState('')
    const [cpfCnpj, setCpfCnpj] = useState('')
    const [dtNascimento, setDtNascimento] = useState('')
    const [genero, setGenero] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [tipoCliente, setTipoCliente] = useState('PF')
    const [observacoes, setObservacoes] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [deficiencia, setDeficiencia] = useState('')
    const [txFoto, setTxFoto] = useState([]);    
    const [errorNome, setErrorNome] = useState('')
    const [errorEmail, setErrorEmail] = useState(null)
    const [errordtNascimento, setErrordtNascimento] = useState('')
    const [errorCep, setErrorCep] = useState(null)
    const [errorCpf, setErrorCpf] = useState(null)
    const [errorSenha, setErrorSenha] = useState('')
    const [errorTelefone, setErrorTelefone] = useState(null)
    const [errorGenero, setErrorGenero] = useState(null)

    const [btTutorBackGroundColor, setBtTutorBackGroundColor] = useState('#0b3a5c');
    const [btTutorFontColor, setBtTutorFontColor] = useState('white');
    const [btOngBackGroundColor, setBtOngBackGroundColor] = useState('#c0c0c0');
    const [btOngFontColor, setBtOngFontColor] = useState('#0b3a5c');
     
    const validar = () => {
        let error = false
        setErrorEmail(null)
        setErrorCpf('')
        setErrorSenha('')
        setErrorTelefone('')
        setErrordtNascimento('')
        setErrorNome('')
        setErrorCep('')
        setErrorGenero(null)
        
        
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(email).toLowerCase())){
          setErrorEmail("Preencha seu e-mail corretamente")
          error = true
        }
        if (email == null){  
        setErrorEmail("Preencha seu e-mail")
          error = true
        }
        const cpnj = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/
        if (!cpnj.test(String(cpfCnpj).toLowerCase())){
                setErrorCpf("Preencha seu CPF/CNPJ corretamente")
                error = true
        }
        if (cpfCnpj == ''){
          setErrorCpf("Preencha seu CPF")
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
        if (genero == null){
                setErrorGenero("Preencha seu sexo")
                error = true
        }
        
        if (cep == ''){
                setErrorCep("Preencha seu CEP")
                error = true
        }
        return !error
      }

    const telaLogin = () => navigation.navigate('Login');

    const cadastrar = ()=>{
        if (validar()){

                fetch(API_URL+'/cliente',{
                        method: 'POST',
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
                                                "ds_uf": uf,
                                                "ds_deficiencia":deficiencia,
                                                "ds_obs": observacoes,
                                                "ds_email": email,
                                                "ds_senha": senha,
                                                "ds_tipo_cliente": tipoCliente,
                                                "tx_foto": txFoto})
                                              }
                        )
                        
                        .then(Alert.alert("Cadastro Realizado Com Sucesso!"),
                                        telaLogin())
                        .catch(error => {Alert.alert("Cadastro incompleto");console.log(error)})
                                        } else {Alert.alert("Cadastro incompleto , preencha os campos obrigatórios");console.log()}           
                }

      const buscaEndereco = async () => {
        fetch('https://viacep.com.br/ws/' + cep + '/json/')
                .then(response => response.json())
                .then(json => {
                        setLogradouro(json.logradouro);
                        setBairro(json.bairro);
                        setUf(json.uf);
                        setCidade(json.localidade);
                })
                .catch(error => {
                        Alert.alert("Digite um cep válido");
                        setLogradouro('');
                        setBairro('');
                        setUf('');
                        setCidade('');
                        setNumero('');
                        console.log(error)})
        }
useEffect(() => {
},[]);

  return (
        
      <SafeAreaView style={styles.container}>
        
        <Text style={{fontSize:40, fontWeight:'bold', marginStart: 10, color:'#0b3a5c'}}>Registro</Text>
        <View style={{flexDirection:'row', marginTop:10, height:50}}>        
                <TouchableWithoutFeedback 
                        style={{marginBottom: 1}}
                        onPress={() => 
                                {setBtTutorBackGroundColor('#0b3a5c');
                                setBtTutorFontColor('white');
                                setBtOngBackGroundColor('#c0c0c0');
                                setBtOngFontColor('#0b3a5c')
                                setTipoCliente('PF')}}>
                        <View style={{marginRight:50 ,backgroundColor:btTutorBackGroundColor, borderRadius:10, height:50, width:200}}>
                                <Text style={{color:btTutorFontColor, fontSize:30, marginStart:40}}>Tutor</Text>
                        </View> 
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback 
                        style={{}}
                        onPress={() => 
                                {setBtTutorBackGroundColor('#c0c0c0');
                                setBtTutorFontColor('#0b3a5c');
                                setBtOngBackGroundColor('#0b3a5c');
                                setBtOngFontColor('white')
                                setTipoCliente('ONG')}}>
                        <View style={{backgroundColor:btOngBackGroundColor, borderRadius:10, height:50, width:120, marginLeft:-70}}>
                                <Text style={{color:btOngFontColor, fontSize:30, marginStart:20}}>ONG</Text>
                        </View> 
                </TouchableWithoutFeedback>
        </View>
                             
        
        <ScrollView>
        <KeyboardAvoidingView        
        //behavior={Platform.OS == "android" ? "padding" : "height"}
        //style={[styles.container]}
        keyboardVerticalOffset={80}>
        
        <View style={{width:400, height:1500,marginTop:15, marginBottom:30, marginLeft: -30}}>
        
        
                <TextInput
                        value={nome}
                        onChangeText={(nome) => {setNome(nome)
                        setErrorNome('')}}
                        style={styles.input}
                        placeholder={(tipoCliente == 'ONG') ? 'Razão Social' : 'Nome completo'}
                        placeholderTextColor="white"
                />
                <Text style={styles.errorMessage}>{errorNome}</Text>
                {tipoCliente == 'PF' &&
                <TextInputMask
                        type={'cpf'}
                        value={cpfCnpj}
                        onChangeText={(cpf) => {setCpfCnpj((cpf.split(".").join("")).replace("-","")),
                                setErrorCpf(null)}}
                        //errorMessage={errorCpf}   
                        style={styles.input}
                        placeholder={(tipoCliente == 'ONG') ? 'CNPJ' : 'CPF'}
                        placeholderTextColor="white"
                        //ref={(ref) => cpfField = ref}
                        keyboardType="phone-pad"  
                        returnKeyType="done"  
                         
                />}
                {tipoCliente == 'ONG' &&
                <TextInputMask
                        type={'cnpj'}
                        value={cpfCnpj}
                        onChangeText={(cpfCnpj) => {setCpfCnpj(cpfCnpj)
                                setErrorCpf(null) }}
                        style={styles.input}
                        placeholder={(tipoCliente == 'ONG') ? 'CNPJ' : 'CPF'}
                        placeholderTextColor="white"
                        //ref={(ref) => cpfField = ref}
                        keyboardType="phone-pad"  
                        returnKeyType="done" 
                        //errorMessage={errorCpf}    
                />}
                <Text style={styles.errorMessage}>{errorCpf}</Text>
                
                {tipoCliente == 'PF' &&
                <View style={styles.input} >        
                        <Picker 
                                selectedValue={genero}
                                mode="dropdown"
                                onValueChange={(genero) => {setGenero(genero) 
                                setErrorGenero(null)}}
                                errorMessage={errorGenero} 
                                style={styles.pickerstyle}
                                
                                >
                                <Picker.Item color='black' label="Sexo"/>
                                <Picker.Item color='black' label="Masculino" value="Masculino" />
                                <Picker.Item color='black' label="Feminino" value="Feminino" />
                        </Picker>
                </View>                     
                }   

                {tipoCliente == 'PF' &&<Text style={styles.errorMessage}>{errorGenero}</Text>}
                <DatePicker
                        style={styles.input}
                        date={dtNascimento}
                        mode="date"
                
                        placeholder={(tipoCliente == 'ONG') ? 'Data Fundação' : 'Data Nascimento'}
                        format="DD-MM-YYYY"
                        minDate="01-05-1920"
                        maxDate="2022-06-30"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 8,
                        marginLeft: 310
                        },
                        placeholderText: {
                        fontSize: 20,
                        color: "white",
                        marginStart: -62
                        },
                        dateInput: {
                        marginLeft: -140,
                        color: 'black',
                        top: 4,
                        borderColor: 'transparent',
                        },
                        dateText: {
                        fontSize: 20,
                        color: "black",
                        textAlign: "left",
                        marginStart: -100
                        }
                        }}
                        onDateChange={(dtNascimento) => {setDtNascimento(dtNascimento)
                        setErrordtNascimento('')}}
                        errorMessage={errordtNascimento}
                />  
                <Text style={styles.errorMessage}>{errordtNascimento}</Text>
                <TextInputMask
                        value={telefone}
                        type={'custom'}
                        options={{mask: '(99) 999999999'}}
                        onChangeText={(telefone) => {setTelefone(telefone.replace("(","").replace(")","").replace(" ",""))
                        setErrorTelefone(null)}}
                        errorMessage={errorTelefone}
                        style={styles.input}
                        placeholder='Telefone'
                        placeholderTextColor="white"
                        keyboardType="phone-pad"  
                        returnKeyType="done" 
                />    
                <Text style={styles.errorMessage}>{errorTelefone}</Text>
                <TextInputMask
                        type='zip-code'
                        value={cep}
                        onChangeText={(cep) => {setCep(cep.replace("-",""))
                        setErrorCep(null)}}
                        errorMessage={errorCep}   
                        onEndEditing={()=>buscaEndereco()}
                        style={styles.input}
                        placeholder='CEP'
                        placeholderTextColor="white"
                />
                <Text style={styles.errorMessage}>{errorCep}</Text>
                <TextInput
                        value={logradouro}
                        onChangeText={(logradouro) => {setLogradouro(logradouro)}}
                        style={styles.input}
                        placeholder='Logradouro'
                        placeholderTextColor="white"
                />

                <Text style={styles.errorMessage}></Text>
                
                <TextInputMask
                        value={numero}
                        type={'custom'}
                        options={{mask: '9999999'}}
                        onChangeText={(numero) => {setNumero(numero)}}
                        style={styles.input}
                        placeholder='Número'
                        placeholderTextColor="white"
                        keyboardType="phone-pad"  
                        returnKeyType="done" 
                /> 
                <Text style={styles.errorMessage}></Text>
                <TextInput
                        value={bairro}
                        onChangeText={(bairro) => {setBairro(bairro)}}
                        style={styles.input}
                        placeholder='Bairro'
                        placeholderTextColor="white"
                />
                <Text style={styles.errorMessage}></Text>
                <TextInput
                        value={cidade}
                        onChangeText={(cidade) => {setCidade(cidade)}}
                        style={styles.input}
                        placeholder='Cidade'
                        placeholderTextColor="white"
                />
                <Text style={styles.errorMessage}></Text>
                <TextInput
                        value={uf}
                        onChangeText={(uf) => {setCidade(uf)}}
                        style={styles.input}
                        placeholder='UF'
                        placeholderTextColor="white"
                />
                <Text style={styles.errorMessage}></Text>

                {tipoCliente == 'PF' &&   
                <View style={styles.input} >
                        <Picker 
                                selectedValue={deficiencia}                                
                                style={styles.pickerstyle}
                                onValueChange={(deficiencia) => {setDeficiencia(deficiencia) }}
                                >
                                <Picker.Item color='black' label="Deficiência" />
                                <Picker.Item color='black' label="SIM" value="SIM" />
                                <Picker.Item color='black' label="NÃO" value="NÃO" />
                        </Picker>
                </View>                     
                                }
                                {tipoCliente == 'PF' &&  <Text style={styles.errorMessage}></Text>}
                        <TextInput
                                value={observacoes}
                                onChangeText={(observacoes) => {setObservacoes(observacoes)}}
                                style={styles.input}
                                placeholder='Observações'
                                placeholderTextColor="white"

                        />
                        <Text style={styles.errorMessage}></Text>
                
                        <TextInput
                value={email}
                placeholder="E-mail"
                placeholderTextColor="white"
                onChangeText={(email) => {
                setEmail(email)
                setErrorEmail('')
                }}
                style={styles.input}
                keyboardType="email-address"
                errorMessage={errorEmail}        
                />
                <Text style={styles.errorMessage}>{errorEmail}</Text>
        
                       <TextInput
                        value={senha}
                        onChangeText={(senha) => {setSenha(senha)
                        setErrorSenha('')}}
                        style={styles.input}
                        placeholder='Senha'
                        placeholderTextColor="white"
                        secureTextEntry={true}
                        errorMessage={errorSenha} 
                />
                <Text style={styles.errorMessage}>{errorSenha}</Text>
                
                <View style={{marginLeft:82, height:40,width: 200, marginBottom: 25}}><UploadImage setProps={setTxFoto}></UploadImage></View>
         
                <TouchableWithoutFeedback 
                        style={{marginBottom: 3}}
                        onPress={() => cadastrar()}>
                        <View style={styles.botaoResponder}>
                                <Text style={styles.responderText}>Cadastrar</Text>
                        </View> 
                </TouchableWithoutFeedback>
        
        
        </View>
        
    </KeyboardAvoidingView>
    </ScrollView> 
    </SafeAreaView>                      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  input: {
    backgroundColor: '#c0c0c0',
    height: 50,
    width: 370,
    marginStart: 30,
    marginTop: 20,
    borderRadius: 10,
    fontSize: 20,
    paddingStart: 20
  },
  logo: {
    height: 120,
    width: 300
  },
  botao: {
    height: 500,
    width: 200,
    marginTop: 200,
    color: '#008000'
  },
  responderText:{
        fontSize: 28,
        marginTop: 5,
        color: 'white',
        marginLeft: 10 ,
        textAlign: 'center'
        },
        botaoResponder:{
        marginTop:20,   
        marginLeft: 60,
        marginBottom: 20,
        height: 50,
        width: 300,
        borderRadius: 15,
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
                marginLeft: 50,
                color: "#f00",
                fontSize: 14
              } ,
              pickerstyle: {
                height: 50, 
                width: 360,
                marginStart: -10,
                color :'white',
                fontSize: 35}

});



