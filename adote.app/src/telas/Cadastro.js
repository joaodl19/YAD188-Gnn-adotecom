import React, {useState,useEffect} from 'react';
import {StyleSheet,
        Text,
        TextInput,
        ScrollView,
        SafeAreaView, 
        View, 
        TouchableWithoutFeedback
} from 'react-native';
import { API_URL } from '@env';
import UploadImage from './components/UploadImage'

export default function Cadastro({navigation}) {
  
    const [nome, setNome] = useState('')
    const [cpfCnpj, setCpfCnpj] = useState('')
    const [dtNascimento, setDtNascimento] = useState('')
    const [genero, setGenero] = useState('')
    const [telefone, setTelefone] = useState('')
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [cidade, setCidade] = useState('')
    const [tipoInstituicao, setTipoInstituicao] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [txFoto, setTxFoto] = useState([])
    const telaHome = () => navigation.navigate('Home');
    const telaLogin = () => navigation.navigate('Login');

    const cadastrar = ()=>{
        fetch(API_URL + '/cliente',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "ds_nome": nome,
                                        "nr_cpf_cnpj": cpfCnpj,
                                        "dt_nascimento_fundacao": dtNascimento,
                                        "ds_genero": genero,
                                        "nr_telefone": telefone,
                                        "nr_cep": cep,
                                        "ds_logradouro": logradouro,
                                        "ds_cidade": cidade,
                                        "ds_deficiencia":"N",
                                        "ds_obs": observacoes,
                                        "ds_email": email,
                                        "ds_senha": senha,
                                        "tx_foto": txFoto})
                                      }
                )
                .then(response => response.json())
                .then(json => Alert.alert("Cadastro Realizado Com Sucesso!"),
                                telaLogin())
                .catch(error => console.log(error))
      }

  useEffect(() => {
  },[]);
  return (
      <SafeAreaView style={styles.container}>
        <Text style={{fontSize:25, fontWeight:'bold', marginTop: 10, marginStart: -210}}>Cadastre-se</Text>
        <View style={{width:430, height:750}}>
        <ScrollView>
                <TextInput
                        value={nome}
                        onChangeText={(nome) => {setNome(nome)}}
                        style={styles.input}
                        placeholder='Nome completo'
                ></TextInput>
                <TextInput
                        value={cpfCnpj}
                        onChangeText={(cpfCnpj) => {setCpfCnpj(cpfCnpj)}}
                        style={styles.input}
                        placeholder='CPF'
                ></TextInput>
                <TextInput
                        value={dtNascimento}
                        onChangeText={(dtNascimento) => {setDtNascimento(dtNascimento)}}
                        style={styles.input}
                        placeholder='Data Nascimento'
                ></TextInput>
                <TextInput
                        value={genero}
                        onChangeText={(genero) => {setGenero(genero)}}
                        style={styles.input}
                        placeholder='Sexo'
                ></TextInput>
                <TextInput 
                        value={telefone}
                        onChangeText={(telefone) => {setTelefone(telefone)}}
                        style={styles.input}
                        placeholder='Telefone'
                ></TextInput>
                <TextInput
                        value={cep}
                        onChangeText={(cep) => {setCep(cep)}}
                        style={styles.input}
                        placeholder='CEP'
                ></TextInput>
                <TextInput
                        value={logradouro}
                        onChangeText={(logradouro) => {setLogradouro(logradouro)}}
                        style={styles.input}
                        placeholder='Logradouro'
                ></TextInput>
                <TextInput
                        value={cidade}
                        onChangeText={(cidade) => {setCidade(cidade)}}
                        style={styles.input}
                        placeholder='Cidade'
                ></TextInput>
                <TextInput
                        value={tipoInstituicao}
                        onChangeText={(tipoInstituicao) => {setTipoInstituicao(tipoInstituicao)}}
                        style={styles.input}
                        placeholder='Tipo Instituição'
                ></TextInput>
                <TextInput
                        value={observacoes}
                        onChangeText={(observacoes) => {setObservacoes(observacoes)}}
                        style={styles.input}
                        placeholder='Observações'
                ></TextInput>
                <TextInput
                        value={email}
                        onChangeText={(email) => {setEmail(email)}}
                        style={styles.input}
                        placeholder='Email'
                ></TextInput>
                <TextInput
                        value={senha}
                        onChangeText={(senha) => {setSenha(senha)}}
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry={true}
                ></TextInput>
                <UploadImage setProps={setTxFoto}></UploadImage>
                <TouchableWithoutFeedback 
                        style={{marginBottom: 1}}
                        onPress={() => cadastrar()}>
                        <View style={styles.botaoResponder}>
                                <Text style={styles.responderText}>Cadastrar</Text>
                        </View> 
                </TouchableWithoutFeedback>
        </ScrollView>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0E68C'
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    height: 50,
    width: 300,
    marginStart: 30,
    marginTop: 20,
    borderRadius: 5,
    fontSize: 20,
    paddingStart: 10
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
        fontSize: 25,
        marginTop: 5,
        color: 'white',
        marginLeft: 10 
        },
        botaoResponder:{
        marginTop:20,   
        marginLeft: 30,
        marginBottom: 20,
        height: 50,
        width: 130,
        borderRadius: 15,
        backgroundColor: '#000080'
        }      
});



