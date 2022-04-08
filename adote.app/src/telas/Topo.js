import React from 'react';
import {Image,StyleSheet,FlatList, SafeAreaView,TextInput, View} from 'react-native';
import TextInputComIcone from '../telas/components/TextInputComIcone'
export default function Topo() {

  return (
      <View style={styles.topo}>
         <View style={{flexDirection: 'row'}}> 
          <Image style={styles.perfil} source={require('../../assets/perfil.png')}/>
          <Image style={styles.logo} source={require('../../assets/LogoT.png')}/>

          </View>   
          <View >
            <TextInputComIcone></TextInputComIcone>
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 75,
    width: 200,
    marginBottom: 100,
    marginLeft: 20
  },
  perfil: {
    marginTop: 60,
    height: 90,
    width: 90,
    marginLeft: -20,
    borderRadius: 45
  },
  topo: {
    height: 100,
    marginTop: 20
  },

});
