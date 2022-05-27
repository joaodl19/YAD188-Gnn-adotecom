import React, {useState,useEffect} from 'react';
import {StyleSheet,Text, SafeAreaView, View,Image} from 'react-native';
import {TouchableOpacity} from 'react-native';

export default function Perfil1({route, navigation}){
  const {cliente} = route.params;
  const telaHome = () => navigation.navigate('Home')
  const telaCadastroPet = () => navigation.navigate('CadastroPet',cliente.id_cliente)
  const telaAgendamentos = () => navigation.navigate('AgendamentosOng', cliente.id_cliente)
  
  const getImageSource = () => {
    return `data:image/jpeg;base64,${cliente.tx_foto}`
  }
  useEffect(() => {
  },[]);

  return(
    <SafeAreaView style={styles.container}>

      <Image style={styles.logo} source={require('../../assets/LogoT.png')}/>
    
      <Image style={styles.perfil} source={{uri: getImageSource()}}/>
      {(cliente.ds_tipo_cliente == 'ONG') &&
        <TouchableOpacity style={styles.botao2}  onPress={()=>telaCadastroPet()}>
            <Text style={{color:'white',textAlign:'center'}}>CADASTRAR PET</Text>
        </TouchableOpacity>      
      }
      <TouchableOpacity style={styles.botao3}  onPress={()=>telaAgendamentos()}>
           <Text style={{color:'white',textAlign:'center'}}>MEUS PET</Text>
      </TouchableOpacity>    

      <Text style={styles.saudacoes}>Dados do cliente:</Text>  
            
              
              <View style={styles.item}><Text  style={styles.fontdados}>Nome: {cliente.ds_nome}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>CPF/CNPJ: {cliente.nr_cpf_cnpj}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Data Nascimento: {cliente.dt_nascimento_fundacao}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Gênero: {cliente.ds_genero}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Telefone: {cliente.nr_telefone}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Cep: {cliente.nr_cep}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Endereço: {cliente.ds_logradouro}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Cidade: {cliente.ds_cidade}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Deficiencia: {cliente.ds_deficiencia}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>Observações: {cliente.ds_obs}</Text></View> 
              <View style={styles.item}><Text style={styles.fontdados}>E-mail: {cliente.ds_email}</Text></View>          
              
          <TouchableOpacity style={styles.botao}  onPress={()=>telaHome()}>
           <Text style={{color:'white',textAlign:'center'}}>RETORNAR AO MENU!</Text>
          </TouchableOpacity>
          
    
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    backgroundColor: '#F0E68C',
  },
  item:{
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    height: 30,
    width: 300,
    marginLeft: 10,
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingStart: 10,
    borderColor: 'black',
    borderWidth: 2
},
  dados:{
    marginLeft: 15,
    fontSize: 18,
    backgroundColor: 'black'
  },
  botao: {
    height: 25,
    width: '50%',
    marginTop: 25,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  botao2: {
    marginLeft: 180,
    height: 20,
    width: '40%',
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
  TextInput:{ 
    paddingLeft: 15,
    height: 25,
    width: '70%',
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: 'white'
    
},
saudacoes:{
    fontSize: 20,
    marginTop: 0,
    marginBottom: 1,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign:'center'
},
fontdados:{
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
        height: 80,
        width: 80,
        marginLeft: -220,
        borderRadius: 45
      },
      topo: {
        height: 100,
        marginTop: 20
      },
    
});