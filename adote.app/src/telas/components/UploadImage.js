import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

export default function UploadImage({setProps}) {
 const [image, setImage] = useState('');
 const window = useWindowDimensions();
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

  
const imageUploaderStyles=StyleSheet.create({
  container:{
      flexDirection: 'row',
      elevation:2,
      height:window.height * 0.800,
      width:window.width * 0.700
  },
  uploadBtnContainer:{
      opacity:2.7,
      left: window.width * 0.070,
      top: window.height * 0.010,
      backgroundColor:'lightgrey',
      borderRadius: window.width * 0.050,
      backgroundColor: '#c0c0c0'
  },
  uploadBtn:{
      display:'flex',
      alignItems:"center",
      justifyContent:'center',
      borderRadius: window.width * 0.050
  }
})
  
 return (
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
          <Text>{image ? 'Editar' : 'Carregar'} Imagem</Text>
            <AntDesign name="camera" size={window.height * 0.030} color="black" />
          <Text>{image}</Text>
        </TouchableOpacity>
      </View>
      );
}

