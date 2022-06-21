import React, { useState, useEffect } from 'react';
import { StyleSheet, useWindowDimensions, ActivityIndicator, Text, SafeAreaView, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { API_URL } from '@env';

export default function aprovarAdocao({ route, navigation }) {
  const host_api = API_URL;
  const window = useWindowDimensions();

  const onRefresh = () => {
    setRefreshing(true);
    buscaQuestionarioCliente(dadosAgendamento.id_cliente);
    setRefreshing(false);

  };

  const [isLoading, setIsLoading] = useState(false);

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
      .then(json => { setPet(json), setIsLoading(true) })
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
      fontSize: window.height * 0.025,
      fontWeight: 'bold',
      color: 'white'
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

  return (
    <SafeAreaView style={styles.container}>
      {(isLoading == false)
        ?
        <View style={{ marginTop: window.height * 0.5 }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
        :
        <View style={{ marginTop: window.height * 0.08 }}>
          <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Finalizar Adoção</Text>
          <View style={{ backgroundColor: '#808080', marginTop: window.height * 0.030, marginStart: window.height * -0.001, height: window.height * 0.170, width: window.width * 1.150 }}>
            <View style={{ backgroundColor: '#808080', marginTop: window.height * 0.015, marginLeft: window.height * 0.025 }}>
              <Text style={styles.fontdados}>Nome Pet: {dadosAgendamento.ds_nome_pet}</Text>
              <Text style={styles.fontdados}>Nome Cliente: {dadosAgendamento.ds_nome_cliente}</Text>
              <Text style={styles.fontdados}>Data Adocao: {currentDate}</Text>
              <Text style={styles.fontdados}>Ong: {pet.ds_nome_ong}</Text>
            </View>
          </View>
          <View style={{ marginTop: window.height * 0.043, flexDirection: 'row' }}>
            <TouchableWithoutFeedback style={{}}
              onPress={() => finalizarAdocao()}>
              <View style={{ marginLeft: window.width * 0.30, backgroundColor: 'green', height: window.width * 0.130, width: window.width * 0.40, borderRadius: window.width * 0.060, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: window.width * 0.05019, color: 'white', fontWeight: 'bold' }}>Finalizar adoção</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      }
    </SafeAreaView>

  );
}




