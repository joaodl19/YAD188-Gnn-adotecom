import React, {useState,useEffect} from 'react';
import {StyleSheet,
        Text,
        TextInput,
        ScrollView,
        SafeAreaView, 
        View,
        Alert, 
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
    const [numero, setNumero] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [tipoCliente, setTipoCliente] = useState('PF')
    const [observacoes, setObservacoes] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [txFoto, setTxFoto] = useState([]);
    const [endereco, setEndereco] = useState([]);
    const telaLogin = () => navigation.navigate('Login');

    const [botaoPfOpacity,setBotaoPfOpacity] = useState(0.3);   
    const [botaoOngOpacity,setBotaoOngOpacity] = useState(1);   
    
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
                                        "nr_numero": numero,
                                        "ds_bairro": bairro,
                                        "ds_cidade": cidade,
                                        "ds_uf": uf,
                                        "ds_deficiencia":"N",
                                        "ds_obs": observacoes,
                                        "ds_email": email,
                                        "ds_senha": senha,
                                        "ds_tipo_cliente": tipoCliente,
                                        "tx_foto": txFoto})
                                      }
                )
                .then(response => response.json())
                .then(json => Alert.alert("Cadastro Realizado Com Sucesso!"),
                                telaLogin())
                .catch(error => console.log(error))
      }

      const buscaEndereco = async ()=>{
        fetch('https://viacep.com.br/ws/' + cep +'/json/')
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
        <Text style={{fontSize:25, fontWeight:'bold', marginTop: 10, marginStart: -210}}>Cadastre-se</Text>
        <View style={{flexDirection:'row', marginTop:10}}>        
                <TouchableWithoutFeedback 
                        style={{marginBottom: 1}}
                        onPress={() => {setBotaoPfOpacity(0.3);setBotaoOngOpacity(1);setTipoCliente('PF')}}>
                        <View style={{marginRight:50, opacity: botaoOngOpacity ,backgroundColor:'white', borderRadius:5, height:40, width:150}}>
                                <Text style={{color:'black', fontSize:20, padding:5, marginStart:5}}>Pessoa Fisica</Text>
                        </View> 
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback 
                        style={{marginBottom: 1}}
                        onPress={() => {setBotaoPfOpacity(1);setBotaoOngOpacity(0.3);setTipoCliente('ONG')}}>
                        <View style={{marginRight:30, opacity: botaoPfOpacity ,backgroundColor:'white', borderRadius:5, height:40, width:120}}>
                                <Text style={{color:'black', fontSize:20, padding:5, marginStart:35}}>ONG</Text>
                        </View> 
                </TouchableWithoutFeedback>
        </View>
        <View style={{width:430, height:750,marginTop:15}}>
        <ScrollView>
                <TextInput
                        value={nome}
                        onChangeText={(nome) => {setNome(nome)}}
                        style={styles.input}
                        placeholder={(tipoCliente == 'ONG') ? 'Razão Social' : 'Nome completo'}
                />
                <TextInput
                        value={cpfCnpj}
                        onChangeText={(cpfCnpj) => {setCpfCnpj(cpfCnpj)}}
                        style={styles.input}
                        placeholder={(tipoCliente == 'ONG') ? 'CNPJ' : 'CPF'}
                />
                <TextInput
                        value={dtNascimento}
                        onChangeText={(dtNascimento) => {setDtNascimento(dtNascimento)}}
                        style={styles.input}
                        placeholder={(tipoCliente == 'ONG') ? 'Data Fundação' : 'Data Nascimento'}
                />
                {tipoCliente == 'PF' &&
                <TextInput
                        value={genero}
                        onChangeText={(genero) => {setGenero(genero)}}
                        style={styles.input}
                        placeholder='Sexo'
                />}
                              
                <TextInput 
                        value={telefone}
                        onChangeText={(telefone) => {setTelefone(telefone)}}
                        style={styles.input}
                        placeholder='Telefone'
                />
                <TextInput
                        value={cep}
                        onChangeText={(cep) => {setCep(cep)}}
                        onEndEditing={()=>buscaEndereco()}
                        style={styles.input}
                        placeholder='CEP'
                />
                <TextInput
                        value={logradouro}
                        onChangeText={(logradouro) => {setLogradouro(logradouro)}}
                        style={styles.input}
                        placeholder='Logradouro'
                />
                <TextInput
                        value={numero}
                        onChangeText={(numero) => {setNumero(numero)}}
                        style={styles.input}
                        placeholder='Numero'
                />
                <TextInput
                        value={bairro}
                        onChangeText={(bairro) => {setBairro(bairro)}}
                        style={styles.input}
                        placeholder='Bairro'
                />
                <TextInput
                        value={cidade}
                        onChangeText={(cidade) => {setCidade(cidade)}}
                        style={styles.input}
                        placeholder='Cidade'
                />
                <TextInput
                        value={uf}
                        onChangeText={(uf) => {setCidade(uf)}}
                        style={styles.input}
                        placeholder='UF'
                />
                <TextInput
                        value={observacoes}
                        onChangeText={(observacoes) => {setObservacoes(observacoes)}}
                        style={styles.input}
                        placeholder='Observações'
                />
                <TextInput
                        value={email}
                        onChangeText={(email) => {setEmail(email)}}
                        style={styles.input}
                        placeholder='Email'
                />
                <TextInput
                        value={senha}
                        onChangeText={(senha) => {setSenha(senha)}}
                        style={styles.input}
                        placeholder='Senha'
                        secureTextEntry={true}
                />
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



