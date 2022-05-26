import React, {useState,useEffect} from 'react';
import {StyleSheet,Text,TextInput,Picker, SafeAreaView, View, TouchableWithoutFeedback, Alert} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars'
import {LocaleConfig} from 'react-native-calendars';
import { API_URL } from '@env';

export default function Agendamento({route, navigation}) {
  
  const {id_cliente, id_pet, id_ong} = route.params;
  LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    dayNamesShort: ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.', 'Dom.'],
    today: "Hoje"
  };
  LocaleConfig.defaultLocale = 'br';

  const [dataSelecionada, setDataSelecionada] = useState('');

  const escolherData = async (data, id_cliente, id_ong, id_pet) =>{
    await fetch(API_URL + '/agendamento',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"id_cliente": id_cliente,
                              "id_pet": id_pet,
                              "id_ong": id_ong,
                              "dt_visita": data})
                            }
          )
         .then(response => response.json())
         .then(Alert.alert("Agendamento solicitado, aguarde a confirmação da ONG."))
         .catch(error => console.log(error),
         telaHome()
         )        
 }

  const telaHome = () => navigation.navigate('Home', {cpf: "1231456"});
  useEffect(() => {
  },[]);
  return (
    <SafeAreaView style={styles.container}>
        <Calendar
          minDate={'2022-05-01'}
          maxDate={'2022-08-10'}
          onDayPress={day => {setDataSelecionada(day.dateString)
          }}
        ></Calendar>
        <Text style={{marginStart: 25, fontSize: 16, marginTop:20}}>Data escolhida</Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput style={styles.input} value={dataSelecionada}></TextInput>
          <TouchableWithoutFeedback style={{marginBottom: 1}}
                          onPress={() => escolherData(dataSelecionada, id_cliente, id_ong, id_pet)}>
                      <View style={styles.botaoResponder}>
                          <Text style={styles.responderText}>Agendar</Text>
                      </View> 
                  </TouchableWithoutFeedback>
        </View>
    </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#F0E68C',
  },
  input: {
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    width: 250,
    marginStart: 20,
    marginTop: 10,
    borderRadius: 5,
    fontSize: 15,
    paddingStart: 10,
  },
  logo: {
    height: 120,
    width: 300
  },
  botao: {
    height: 500,
    width: 200,
    marginTop: 200,
    color: '#008000',
  },
  
responderText:{
  fontSize: 18,
  marginTop: 5,
  color: 'white',
  marginLeft: 10 
},
botaoResponder:{
  marginTop:10,   
  marginLeft: 20,
  height: 40,
  width: 95,
  borderRadius: 15,
  backgroundColor: '#000080'
},

});



