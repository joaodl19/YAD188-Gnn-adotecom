import React,{useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    useWindowDimensions,
    TouchableWithoutFeedback
  } from 'react-native';
  import { API_URL } from '@env';


  export default function Pets({navigation, id_cliente, tipo_cliente, ds_nome, ds_raca, tx_foto, id_pet, ds_status, id_ong, ds_nome_ong}){
    
    const host_api = API_URL

    const getImageSource = () => {
        return `data:image/jpeg;base64,${tx_foto}`
      }
    const window = useWindowDimensions();
    
    const [adocao, setAdocao] = useState([]);
     
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
        if(ds_status == 'Aguardando retirada'){
            telaFinalizarAdocao()
        }
    };            

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#808080',
            borderRadius: window.width * 0.044,
            marginBottom: window.width * 0.030            
        },  
        item:{
            alignItems: 'center',
            backgroundColor: '#808080',
            borderRadius: window.width * 0.055,
            height: window.height * 0.164,
            width: window.width * 0.844,
            marginLeft: window.width * 0.025,
            marginTop: window.width * 0.025,
            flexDirection: 'row'
        },
        foto:{
            marginLeft: window.width * 0.050,
            height: window.height * 0.174,
            width: window.width * 0.380,
            borderRadius: window.width * 0.055
        },
        fontdados:{
            fontSize: window.height * 0.020,
            fontWeight: 'bold',
            color: 'white',
            width: window.width * 0.505
        },
        dados:{
            marginLeft: window.height * 0.020,
            fontSize: window.height * 0.020,
            backgroundColor: '#808080'
        },
        lineStyle:{
            borderWidth: window.height * 0.0007,
            borderColor:'black',
            margin:window.height * 0.015
        },
        })

    const telaPerfilPet = () => navigation.navigate('PerfilPet', {id_pet: id_pet, id_cliente: id_cliente, tipo_cliente: tipo_cliente, id_ong: id_ong})
    const telaConfirmarAgendamento = () => navigation.navigate('ConfirmarAgendamento', {id_pet: id_pet})
    const telaAprovarAdocao = () => navigation.navigate('AprovarAdocao', {id_pet: id_pet, id_cliente})
    const telaFinalizarAdocao = () => navigation.navigate('FinalizarAdocao',{id_pet: id_pet, id_cliente: id_cliente})
    return(
        <View style={styles.container}>
            <View style={styles.item}>
                <TouchableWithoutFeedback style={{marginTop: window.height * 0.590}}
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
            {(tipo_cliente == 'ONG' && (ds_status != 'Disponive0ol' && ds_status != 'Adotado')) &&
            <TouchableWithoutFeedback 
                    style={{marginTop: window.height * 0.590}}
                    onPress={() => proximaTela()}>
                <View style={{marginLeft:window.width * 0.470, backgroundColor:'green',borderRadius: window.height * 0.035, height:window.height * 0.065, width:window.width * 0.365, justifyContent:'center'}}>
                   <Text style={{textAlign:'center', fontSize:window.width * 0.044, color:'white'}}>{labelBotao()}</Text>
                </View>
            </TouchableWithoutFeedback>}
            <View style = {styles.lineStyle} />
        </View>  
      )
  };
  
