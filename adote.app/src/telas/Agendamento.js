import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, useWindowDimensions, SafeAreaView, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { LocaleConfig } from 'react-native-calendars';
import { API_URL } from '@env';

export default function Agendamento({ route, navigation }) {

  const host_api = API_URL;
  const window = useWindowDimensions();
  const { id_cliente, id_pet, id_ong } = route.params;
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

  const montaData = (day) => {
    let dia;
    let mes;
    let ano = day.year;
    if (day.day < 10) { dia = '0' + day.day } else { dia = day.day };
    if (day.month < 10) { mes = '0' + day.month } else { mes = day.month };
    setDataSelecionada(dia + '-' + mes + '-' + ano)
  }
  const escolherData = async (data, id_cliente, id_ong, id_pet) => {
    await fetch(host_api + '/agendamento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_cliente": id_cliente,
        "id_pet": id_pet,
        "id_ong": id_ong,
        "dt_visita": data
      })
    }
    )
      .then(response => response.json())
      .then(Alert.alert("Agendamento solicitado, aguarde a confirmação da ONG."))
      .catch(error => console.log(error),
        telaHome()
      )
  }

  const telaHome = () => navigation.navigate('Home', { cpf: "1231456" });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      backgroundColor: '#c0c0c0',
    },
    input: {
      borderWidth: window.width * 0.002,
      backgroundColor: 'white',
      height: window.width * 0.110,
      width: window.width * 0.640,
      marginStart: window.width * 0.065,
      marginTop: window.width * 0.024,
      borderRadius: window.width * 0.020,
      fontSize: window.width * 0.050,
      paddingStart: window.width * 0.040
    },
    responderText: {
      fontSize: window.width * 0.052,
      marginTop: window.width * 0.010,
      color: 'white',
      marginLeft: window.width * 0.025
    },
    botaoResponder: {
      marginTop: window.width * 0.027,
      marginLeft: window.width * 0.025,
      height: window.width * 0.105,
      width: window.width * 0.250,
      borderRadius: window.width * 0.040,
      backgroundColor: '#000080'
    }

  });


  useEffect(() => {
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Calendar style={{marginTop: 70}}
        minDate={'2022-06-01'}
        maxDate={'2022-08-10'}
        onDayPress={day => {
          montaData(day)
        }}
      ></Calendar>
      <Text style={{
        fontSize: window.width * 0.054,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: window.width * 0.100,
        marginBottom: window.width * 0.080
      }}>Agende uma data em que você esteja disponivel,
        para que um agente da ONG possa visitar sua residência</Text>

      <Text style={{ fontWeight: 'bold', marginStart: window.width * 0.080, fontSize: window.width * 0.043, marginTop: window.width * 0.060 }}>Data escolhida</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.input} value={dataSelecionada}></TextInput>
        <TouchableWithoutFeedback style={{ marginBottom: 1 }}
          onPress={() => escolherData(dataSelecionada, id_cliente, id_ong, id_pet)}>
          <View style={styles.botaoResponder}>
            <Text style={styles.responderText}>Agendar</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>

  );
}



