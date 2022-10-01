import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

interface LocalImage {
  defaultUri?: string;
  remoteUri?: string;
  localUri?: string;
}

export default function App() {
  const [selectedImg, setSelectedImg] = useState<LocalImage | null>(null);

  /*Pedri permissão para entrar na pasta de midias */
  const openImagePickerAsync = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permissão não concedida...");
      return;
    }
    const picker = await ImagePicker.launchImageLibraryAsync();
    if (picker.cancelled) return;

    setSelectedImg({ remoteUri: picker.uri } as LocalImage);
  };

  useEffect(() => {
    setSelectedImg({defaultUri: 'https://reactjs.org/logo-og.png'} as LocalImage)
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.Text}>
        <Text> Por favor, selecione uma imagem...</Text>
        <Text> 🙂 😉 😀 😕 😎  ♥ ♦ ♣ ♠ • ○</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonLabel}>Selecionar imagem :)</Text>
        </TouchableOpacity>
      </View>

      <Image
      style={styles.image}
      source={{ uri: selectedImg?.remoteUri ?? selectedImg?.defaultUri }}
      resizeMode="contain"
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    /*Eixo orizontal*/
    alignItems: 'center',
    /*Eixo vertical*/
    justifyContent: 'center',
  },
  Text:{
    flex: 1.5,
    /*backgroundColor: '#cccc',*/
    alignItems: 'center',
    justifyContent: 'center',
    /*Dar um espaço do topo*/
    marginTop: 35,
  },
  actions:{
    flex: 0.5,
    /*backgroundColor: '#FFFF00',*/
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
  },
  image:{
    Height: 400,
    width: 400,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
    margin: 30,
    /*backgroundColor: '#FFFF00',*/
  },
  button:{
    borderWidth: 1,
    borderColor: '#00FF00',
    padding: 16,
    borderRadius: 30,
    backgroundColor: '#2E8B57',
    height: 56,
    ...Platform.select({
      ios: {
        borderRadius: 5,
        backgroundColor: '#2E8B57'
      },
      android: {
        borderRadius: 30,
        backgroundColor: '#2E8B57'
      }
    })

  },
  buttonLabel:{
    color:'#00FA9A'

  },

});
