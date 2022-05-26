import React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/telas/Home';
import Login from './src/telas/Login';
import Questionario from './src/telas/Questionario'
import Cadastro from './src/telas/Cadastro'
import Agendamento from './src/telas/Agendamento'
import AgendamentosOng from './src/telas/AgendamentosOng';
import Perfil1 from './src/telas/Perfil'
import CadastroPet from './src/telas/CadastroPet'
import PerfilPet from './src/telas/PerfilPet'

CadastroPet
export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />

    <Stack.Screen name="Home" component={Home} />

    <Stack.Screen name="PerfilPet" component={PerfilPet} />

    <Stack.Screen name="CadastroPet" component={CadastroPet} />

    <Stack.Screen name="Perfil" component={Perfil1} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="AgendamentosOng" component={AgendamentosOng} />
      <Stack.Screen name="Agendamento" component={Agendamento} />
      <Stack.Screen name="Questionario" component={Questionario} /> 
    </Stack.Navigator>
  </NavigationContainer>
  );
  }