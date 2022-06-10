import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    TouchableWithoutFeedback
  } from 'react-native';

  export default function Pets({navigation, id_cliente, tipo_cliente, ds_nome, ds_raca, tx_foto, id_pet, ds_status, id_ong, ds_nome_ong}){
    const getImageSource = () => {
        return `data:image/jpeg;base64,${tx_foto}`
      }
    const labelBotao = () => {
        if(ds_status == 'Aguardando aprovação agendamento'){
            return 'Confirmar Agendamento'
        }
        if(ds_status == 'Aguardando visita'){
            return 'Aprovar adoção'    
        }
        if(ds_status == 'Aguardando retirada'){
            return 'Finalizar'    
        }
    };

    const proximaTela = () => {
        if(ds_status == 'Aguardando aprovação agendamento'){
            telaConfirmarAgendamento()
        } 
        if(ds_status == 'Aguardando visita'){
            telaAprovarAdocao()
        }
    };            

    

    const telaPerfilPet = () => navigation.navigate('PerfilPet', {id_pet: id_pet, id_cliente: id_cliente, tipo_cliente: tipo_cliente, id_ong: id_ong})
    const telaConfirmarAgendamento = () => navigation.navigate('ConfirmarAgendamento', {id_pet: id_pet})
    const telaAprovarAdocao = () => navigation.navigate('AprovarAdocao', {id_pet: id_pet, id_cliente})

    return(
        <View style={styles.container}>
            <View style={styles.item}>
                <TouchableWithoutFeedback style={{marginTop: 100}}
                        onPress={() => telaPerfilPet()}>
                    <Image style={styles.foto} source={{uri: getImageSource()}}/>
                </TouchableWithoutFeedback>
                <View style={styles.dados}>
                    <Text style={styles.fontdados}>Nome: {ds_nome}</Text>
                    <Text style={styles.fontdados}>Raça: {ds_raca}</Text>
                    <Text style={styles.fontdados}>Nome ONG: {ds_nome_ong}</Text>
                    <Text style={styles.fontdados}>Status: {ds_status}</Text>
                </View>
            </View>
            {(tipo_cliente == 'ONG' && ds_status != 'DISPONIVEL') &&
            <TouchableWithoutFeedback 
                    style={{marginTop: 100}}
                    onPress={() => proximaTela()}>
                <View style={{marginLeft:260, backgroundColor:'green', height:40, width:110}}>
                   <Text style={{textAlign:'center', fontSize:16, color:'white'}}>{labelBotao()}</Text>
                </View>
            </TouchableWithoutFeedback>}
            <View style = {styles.lineStyle} />
        </View>  
      )
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#808080',
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 0
    },  
    item:{
        alignItems: 'center',
        backgroundColor: '#808080',
        borderRadius: 50,
        height: 130,
        width: 370,
        marginLeft: 10,
        marginTop: 10,
        flexDirection: 'row'
    },
    foto:{
        marginLeft: 15,
        height: 130,
        width: 140,
        borderRadius: 20
    },
    fontdados:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        width: 200
    },
    dados:{
        marginLeft: 15,
        fontSize: 18,
        backgroundColor: '#808080'
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
    },
    })