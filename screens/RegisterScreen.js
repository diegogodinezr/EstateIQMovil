import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Aquí debes implementar la lógica de registro 
    // (por ejemplo, enviar los datos a un backend)
    console.log('Datos de registro:', { email, password, confirmPassword });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dale la bienvenida a</Text>
      <Text style={styles.appName}>EstateIQ</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <MaterialIcons name="email" size={24} color="black" />
          <TextInput 
            style={styles.input} 
            placeholder="Correo electrónico" 
            value={email} 
            onChangeText={setEmail} 
          />
        </View>
        <View style={styles.inputField}>
          <MaterialCommunityIcons name="lock" size={24} color="black" />
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            secureTextEntry={true} 
            value={password} 
            onChangeText={setPassword} 
          />
        </View>
        <View style={styles.inputField}>
          <MaterialCommunityIcons name="lock" size={24} color="black" />
          <TextInput 
            style={styles.input} 
            placeholder="Confirmar contraseña" 
            secureTextEntry={true} 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
          />
        </View>
      </View>

      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF0F0', // Color de fondo
        padding: 10,
      },
      title: {
        fontSize: 20,
        marginBottom: 20,
      },
      logo: {
        height: 100, 
        width: 'auto', 
        marginBottom: 20,
      },
      appName: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 40,
      },
      inputContainer: {
        width: '80%',
        marginBottom: 30,
      },
      inputField: {
        backgroundColor: '#FFFAF0', // Color de fondo de los campos de entrada
        padding: 20, // Aumenta el padding para mayor tamaño
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
      },
      input: {
        flex: 1,
        marginLeft: 10,
        textAlign: 'center',
        borderRadius: 5,
        backgroundColor: '#FFD78F', // Color del campo
        fontSize: 16, // Aumenta el tamaño del texto
        padding: 6, // Agrega padding para el texto
      },
      button: {
        backgroundColor: '#E0E0FF', // Color del botón
        padding: 20, // Aumenta el padding para mayor tamaño
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
      },
      buttonText: {
        color: '#000',
        textAlign: 'center',
        borderRadius: 10,
        padding: 14, // Agrega padding para el texto
        fontSize: 22, // Aumenta el tamaño del texto
        fontWeight: 'bold',
        width: '60%',
        backgroundColor: '#A7BEFF',
      },
    });

export default RegisterScreen;