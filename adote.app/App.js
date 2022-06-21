import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';
import Home from './src/telas/Home';
import Login from './src/telas/login';
import Questionario from './src/telas/Questionario'
import Cadastro from './src/telas/Cadastro'
import Agendamento from './src/telas/Agendamento'
import AgendamentosOng from './src/telas/AgendamentosOng';
import ConfirmarAgendamento from './src/telas/ConfirmarAgendamento';
import Perfil1 from './src/telas/Perfil'
import CadastroPet from './src/telas/CadastroPet'
import PerfilPet from './src/telas/PerfilPet'
import AprovarAdocao from './src/telas/AprovarAdocao'
import FinalizarAdocao from './src/telas/FinalizarAdocao'
import Solicitacao from './src/telas/Solicitacao'


LogBox.ignoreAllLogs();
CadastroPet
export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PerfilPet" component={PerfilPet} />
        <Stack.Screen name="CadastroPet" component={CadastroPet} />
        <Stack.Screen name="Perfil" component={Perfil1} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="AgendamentosOng" component={AgendamentosOng} />
        <Stack.Screen name="ConfirmarAgendamento" component={ConfirmarAgendamento} />
        <Stack.Screen name="Agendamento" component={Agendamento} />
        <Stack.Screen name="Questionario" component={Questionario} />
        <Stack.Screen name="AprovarAdocao" component={AprovarAdocao} />
        <Stack.Screen name="FinalizarAdocao" component={FinalizarAdocao} />
        <Stack.Screen name="Solicitacao" component={Solicitacao} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}