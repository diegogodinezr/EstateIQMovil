import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Define la función handleLogin
  const handleLogin = () => {
    // Aquí debes implementar la lógica de inicio de sesión 
    // (por ejemplo, enviar los datos a un backend)
    console.log('Datos de inicio de sesión:', { email, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
        />
      </View>
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
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff', 
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
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
    backgroundColor: '#D0DCFF', 
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000', // Color del texto
    borderRadius: 10,
    backgroundColor: '#D0DCFF', 
    fontSize: 16, 
    padding: 6, 
  },
  button: {
    padding: 14,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    borderRadius: 10,
    padding: 14, 
    fontSize: 22, 
    fontWeight: 'bold',
    width: '80%',
    backgroundColor: '#FFC157',
  },
  forgotPasswordText: {
    marginTop: 20,
    color: '#000',
  },
});

export default LoginScreen;