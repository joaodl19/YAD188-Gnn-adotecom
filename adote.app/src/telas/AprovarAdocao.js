import React, { useState, useEffect } from 'react';
import { StyleSheet, useWindowDimensions, Image, FlatList, Text, TextInput, Picker, SafeAreaView, RefreshControl, View, TouchableWithoutFeedback, Alert } from 'react-native';
import QuestionarioCliente from './components/QuestionarioCliente';
import { API_URL } from '@env';

export default function AprovarAdocao({ route, navigation }) {
  const host_api = API_URL;
  const window = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    buscaQuestionarioCliente(dadosAgendamento.id_cliente);
    setRefreshing(false);

  };

  const telaHome = () => navigation.navigate('Home')

  const { id_pet } = route.params;
  const [pet, setPet] = useState([]);
  const [dadosAgendamento, setDadosAgendamento] = useState([]);
  const [dadosQuestionario, setDadosQuestionario] = useState([]);
  const [questionario, setQuestionario] = useState('false');

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

  const aprovar = async (id_agendamento) => {
    fetch(host_api + '/agendamento/' + id_agendamento + '/aprovar', {
      method: 'PUT'
    }
    )
      .then(response => response.json())
      .then(atualizarStatusPet(id_pet, 'Encerrado'))
      .catch(error => console.log(error))

  }
  const atualizarStatusPet = async (id_pet, status) => {
    fetch((host_api + '/pet/' + id_pet + '/' + status), {
      method: 'PUT'
    }
    )
      .then(response => response.json())
      .then(buscarDadosAgendamento(id_pet))
      .catch(error => console.log(error))

  }

  const aprovarAdocao = () => {
    atualizarStatusPet(id_pet, 'Aguardando retirada');
    Alert.alert("Adoção aprovada com sucesso, aguardando a retirada do pet");
    telaHome();
  }
  const buscaQuestionarioCliente = async (id_cliente) => {
    fetch(host_api + '/questionario/' + id_cliente)
      .then(response => response.json())
      .then(json => setDadosQuestionario(json))
      .catch(error => console.log(error))
  };

  const finalizarVisita = () => {
    atualizarStatusPet(id_pet, 'Visita Realizada');
    buscaQuestionarioCliente(dadosAgendamento.id_cliente);
    buscarDadosAgendamento(id_pet);
    buscarDadosPet(id_pet);
    setQuestionario(true);
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      backgroundColor: 'white',
      height: window.height
    },

    fontdados: {
      fontSize: window.height * 0.025,
      fontWeight: 'bold',
      color: 'white'
    }
  });


  useEffect(() => {
    buscarDadosAgendamento(id_pet);
    buscarDadosPet(id_pet);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: window.height * 0.043, fontWeight: 'bold', marginTop: window.height * 0.07 }}>Aprovar Adoção</Text>
      <View style={{ backgroundColor: '#808080', marginTop: window.height * 0.030, marginStart: window.height * -0.001, height: window.height * 0.170, width: window.width * 1.150 }}>
        <View style={{ backgroundColor: '#808080', marginTop: window.height * 0.015, marginLeft: window.height * 0.025 }}>
          <Text style={styles.fontdados}>Nome Pet: {dadosAgendamento.ds_nome_pet}</Text>
          <Text style={styles.fontdados}>Nome Cliente: {dadosAgendamento.ds_nome_cliente}</Text>
          <Text style={styles.fontdados}>Data Visita: {dadosAgendamento.dt_visita}</Text>
          <Text style={styles.fontdados}>Status: {pet.ds_status}</Text>
        </View>
      </View>
      <View style={{ marginTop: window.height * 0.043, flexDirection: 'row', width: window.width }}>
        {(pet.ds_status == 'Visita Realizada') ?
          <TouchableWithoutFeedback style={{}}
            onPress={() => aprovarAdocao()}>
            <View style={{ marginTop: window.width * -0.025, marginLeft: window.width * 0.110, backgroundColor: 'green', height: window.width * 0.180, width: window.width * 0.310, borderRadius: window.width * 0.060, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: window.width * 0.050, color: 'white', fontWeight: 'bold' }}>Aprovar Adocao</Text>
            </View>
          </TouchableWithoutFeedback>
          :
          <TouchableWithoutFeedback style={{}}
            onPress={() => aprovar(dadosAgendamento.id_agendamento)}>
            <View style={{ marginLeft: window.width * 0.035, backgroundColor: 'green', height: window.width * 0.130, width: window.width * 0.260, borderRadius: window.width * 0.060, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: window.width * 0.050, color: 'white', fontWeight: 'bold' }}>Reagendar</Text>
            </View>
          </TouchableWithoutFeedback>
        }
        <TouchableWithoutFeedback style={{}}
          onPress={() => telaConfirmarAgendamento()}>
          <View style={{ marginLeft: window.width * 0.050, backgroundColor: 'red', height: window.width * 0.130, width: window.width * 0.240, borderRadius: window.width * 0.060, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: window.width * 0.050, color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
          </View>
        </TouchableWithoutFeedback>
        {(pet.ds_status == 'Aguardando visita') ?
          <TouchableWithoutFeedback style={{}}
            onPress={() => finalizarVisita()}>
            <View style={{ marginLeft: window.width * 0.040, backgroundColor: 'blue', height: window.width * 0.130, width: window.width * 0.360, borderRadius: window.width * 0.060, justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontSize: window.width * 0.05019, color: 'white', fontWeight: 'bold' }}>Finalizar visita</Text>
            </View>
          </TouchableWithoutFeedback>
          : <Text></Text>}

      </View>

      {(questionario == true) ?
        <View style={{ marginTop: window.width * 0.00, marginStart: window.width * 0.195, height: window.height * 0.027 }}>
          <Text style={{ fontSize: window.width * 0.068, marginBottom: window.width * -0.060, fontWeight: 'bold' }}>Questionario Cliente</Text>
        </View>
        : <Text></Text>

      }
      {(questionario == true) ?
        <View style={{ backgroundColor: 'white', height: window.height * 0.470, width: window.height * 0.600, marginTop: window.height * 0.050, marginLeft: window.height * -0.035 }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={dadosQuestionario}
            renderItem={({ item }) => <QuestionarioCliente {...item}
              keyExtractor={(item, index) => index.toString()} />} />

        </View>
        :
        <Text></Text>
      }

    </SafeAreaView>

  );
}



