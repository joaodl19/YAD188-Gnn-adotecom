import React, { useState, useEffect } from 'react';
import { StyleSheet, useWindowDimensions, Image, FlatList, Text, TextInput, Picker, SafeAreaView, RefreshControl, View, TouchableWithoutFeedback, Alert } from 'react-native';
import QuestionarioCliente from './components/QuestionarioCliente';
import { API_URL } from '@env';

export default function aprovarAdocao({ route, navigation }) {
  const host_api = API_URL;
  const window = useWindowDimensions();

  const onRefresh = () => {
    setRefreshing(true);
    buscaQuestionarioCliente(dadosAgendamento.id_cliente);
    setRefreshing(false);

  };

  const telaHome = () => navigation.navigate('Home')

  const { id_pet } = route.params;
  const [pet, setPet] = useState([]);
  const [dadosAgendamento, setDadosAgendamento] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  const buscarDadosAgendamento = async (id_pet) => {
    fetch(host_api + '/agendamento/pet/' + id_pet)
      .then(response => response.json())
      .then(json => setDadosAgendamento(json))
      .catch(error => console.log(error))
  };

  const buscarDadosPet = async (id_pet) => {
    fetch(host_api + '/pet/' + id_pet)
      .then(response => response.json())
      .then(json => setPet(json))
      .catch(error => console.log(error))
  };

  const atualizarStatusPet = async (id_pet, status) => {
    fetch((host_api + '/pet/' + id_pet + '/' + status), {
      method: 'PUT'
    }
    )
      .then(response => response.json())
      .then(buscarDadosAgendamento(id_pet))
      .catch(error => console.log(error))

  }

  const encerrarAdocao = async (id_pet) => {
    fetch((host_api + '/adocao/' + id_pet + '/encerrar'), {
      method: 'PUT'
    }
    )
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  const finalizarAdocao = () => {
    atualizarStatusPet(id_pet, 'Adotado');
    encerrarAdocao(id_pet);
    Alert.alert("Parabéns, mais um Pet encontrou um lar!");
    telaHome();
  }

  useEffect(() => {

    var date_aux = new Date().getDate(); //Current Date
    var date;
    if (month_aux <= 9) {
      date = '0' + date_aux;
    } else {
      date = date_aux;
    }
    var month_aux = new Date().getMonth() + 1; //Current Month
    var month;
    if (month_aux <= 9) {
      month = '0' + month_aux;
    } else {
      month = month_aux;
    }
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '-' + month + '-' + year
    );

    buscarDadosAgendamento(id_pet);
    buscarDadosPet(id_pet);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Finalizar Adoção</Text>
      <View style={{ backgroundColor: 'white', height: window.height * 0.26, width: window.width, marginTop: 10, marginLeft: 30 }}>
        <View style={{ backgroundColor: '#c0c0c0', marginTop: 10, height: window.height * 0.16, marginLeft: -35 }}>
          <Text style={styles.fontdados}>Nome Pet: {dadosAgendamento.ds_nome_pet}</Text>
          <Text style={styles.fontdados}>Nome Cliente: {dadosAgendamento.ds_nome_cliente}</Text>
          <Text style={styles.fontdados}>Data Adocao: {currentDate}</Text>
          <Text style={styles.fontdados}>Ong: {pet.ds_nome_ong}</Text>
        </View>
        <View style={{ marginTop: 15, flexDirection: 'row' }}>
          <TouchableWithoutFeedback style={{}}
            onPress={() => finalizarAdocao()}>
            <View style={{ marginLeft: 60, backgroundColor: 'green', height: 50, width: 190, borderRadius: 30, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: 19, color: 'white', fontWeight: 'bold' }}>Finalizar Adoção</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    height: window.height,
    width: window.width,
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: 'white',
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
  fontdados: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginStart: 40
  },
  responderText: {
    fontSize: 18,
    marginTop: 5,
    color: 'white',
    marginLeft: 10
  },
  botaoResponder: {
    marginTop: 10,
    marginLeft: 20,
    height: 40,
    width: 95,
    borderRadius: 15,
    backgroundColor: '#000080'
  },

});



