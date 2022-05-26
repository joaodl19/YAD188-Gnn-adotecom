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

  export default function Pets({navigation, id_cliente, ds_nome, ds_raca, tx_foto,id_pet, id_ong}){
    const getImageSource = () => {
        return `data:image/jpeg;base64,${tx_foto}`
      }
    
    const telaPerfilPet = () => navigation.navigate('PerfilPet', {id_pet: id_pet, id_cliente: id_cliente, id_ong: id_ong})

    

    return(
        <View style={styles.container}>
            <View style={styles.item}>
                <TouchableWithoutFeedback style={{marginTop: 100}}
                        onPress={() => telaPerfilPet()}>
                    <Image style={styles.foto} source={{uri: getImageSource()}}></Image>
                </TouchableWithoutFeedback>
                <View style={styles.dados}>
                    <Text style={styles.fontdados}>Nome: {ds_nome}</Text>
                    <Text style={styles.fontdados}>Raça: {ds_raca}</Text>
                    <Text style={styles.fontdados}>Nome ONG: LOVEPET</Text>
                    <TouchableWithoutFeedback style={{marginTop: 100}}
                        onPress={() => adotar(tx_foto)}>
                    <View style={styles.botaoAdotar}>
                        <Text style={styles.adotarText}>Adotar</Text>
                    </View> 
                </TouchableWithoutFeedback>
                </View>
            </View>
        </View>  
      )
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
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
        flexDirection: 'row',
        backgroundColor: 'black'
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
        color: 'white'
    },
    dados:{
        marginLeft: 15,
        fontSize: 18,
        backgroundColor: 'black'
    },
    botaoAdotar:{
        marginTop: 10,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        height: 40,
        width: 70,
        borderRadius: 15,
        backgroundColor: '#000080'
    },
    adotarText:{
        fontSize: 18,
        marginTop: 5,
        color: 'white'
        
    }
    })