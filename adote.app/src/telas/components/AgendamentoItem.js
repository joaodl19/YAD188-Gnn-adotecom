import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Alert,
    TouchableWithoutFeedback
  } from 'react-native';
  import { API_URL } from '@env';

  export default function AgendamentoItem({ds_nome_cliente, ds_nome_pet, dt_visita,ds_status, id_agendamento}){
    const renderizaBotao = (ds_status) => {
        if(ds_status == "Pendente"){
           return <TouchableWithoutFeedback style={{marginTop: 100}}
            onPress={() => aprovar(id_agendamento)}>
                <View style={styles.botaoAprovar}>
                    <Text style={styles.adotarText}>Aprovar</Text>
                </View> 
            </TouchableWithoutFeedback> 
        }
        return <TouchableWithoutFeedback style={{marginTop: 100}}
        onPress={() => aprovar()}>
            <View style={styles.botaoCancelar}>
                <Text style={styles.adotarText}>Cancelar</Text>
            </View> 
        </TouchableWithoutFeedback>
    }    
    const aprovar = async (id_agendamento) =>{
        fetch((API_URL + '/agendamento/' + id_agendamento + '/aprovar'),{
            method: 'PUT'}
            )
             .then(response => response.json())
             .then(Alert.alert("Aprovacao Realizada")
             .catch(error => console.log(error))
            
        )
    }

    return(
        <View>
            <View style={styles.item}>
                <View style={styles.dados}>
                    <Text style={styles.fontdados}>Nome Cliente: {ds_nome_cliente} </Text>
                    <Text style={styles.fontdados}>Nome Pet: {ds_nome_pet}</Text>
                    <Text style={styles.fontdados}>Data Visita: {dt_visita}</Text>
                    <Text style={styles.fontdados}>Status: {ds_status}</Text>                    
                </View>
                {renderizaBotao(ds_status)}
            </View>
        </View>  
      )
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 10
    },  
    item:{
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        height: 150,
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
        color: 'black'
    },
    dados:{
        marginLeft: 15,
        fontSize: 18,
        backgroundColor: 'white'
    },
    botaoAprovar:{
        marginBottom: 50,
        marginLeft: 30,
        alignItems: "center",
        backgroundColor: "white",
        height: 40,
        width: 90,
        borderRadius: 15,
        backgroundColor: 'green'
    },
    botaoCancelar:{
        marginBottom: 50,
        marginLeft: 30,
        alignItems: "center",
        backgroundColor: "white",
        height: 40,
        width: 90,
        borderRadius: 15,
        backgroundColor: 'red'
    },
    adotarText:{
        fontSize: 18,
        marginTop: 5,
        color: 'white'
        
    }
    })