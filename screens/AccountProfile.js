import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [userName, setUserName] = useState('Juan Gonzalez');
  const [email, setEmail] = useState('correo@ejemplo.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();

  const handleChooseImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setProfileImage({ uri: pickerResult.uri });
    }
  };

  const handleSave = () => {
    console.log('Guardando cambios del perfil...', { userName, email, phone, profileImage });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.emptySpace} />
      </View>

      <TouchableOpacity style={styles.profileImageContainer} onPress={handleChooseImage}>
        {profileImage ? (
          <Image source={profileImage} style={styles.profileImage} />
        ) : (
          <MaterialIcons name="person" size={60} color="gray" />
        )}
        <MaterialIcons name="edit" size={24} color="black" style={styles.editIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.userNameButton}>
        <Text style={styles.userNameText}>{userName}</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Correo electrónico" />
        <TouchableOpacity style={styles.clearButton}>
          <MaterialIcons name="close" size={16} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Teléfono" />
        <TouchableOpacity style={styles.clearButton}>
          <MaterialIcons name="close" size={16} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptySpace: {
    width: 24,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
  },
  userNameButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  saveButton: {
    backgroundColor: '#FFC157',
    padding: 15,
    width: '60%',
    marginLeft: '20%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ProfileScreen;
