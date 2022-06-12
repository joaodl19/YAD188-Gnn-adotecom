import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

export default function UploadImage({setProps}) {
 const [image, setImage] = useState('');
 const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4,4],
      quality: 1
    });

   if (!_image.cancelled) {
     
    setProps(_image.base64);
    }
  };
  
 return (
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
          <Text>{image ? 'Editar' : 'Carregar'} Imagem</Text>
            <AntDesign name="camera" size={20} color="black" />
          <Text>{image}</Text>
        </TouchableOpacity>
      </View>
      );
}

const imageUploaderStyles=StyleSheet.create({
   container:{
       flexDirection: 'row',
       elevation:2,
       height:200,
       width:400,
   },
   uploadBtnContainer:{
       opacity:2.7,
       left: 30,
       top:10,
       backgroundColor:'lightgrey',
       borderRadius: 20,
       backgroundColor: '#c0c0c0'
   },
   uploadBtn:{
       display:'flex',
       alignItems:"center",
       justifyContent:'center',
       borderRadius: 15
   }
})