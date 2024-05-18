import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Dale la bienvenida a</Text>
        <Text style={styles.appName}>EstateIQ</Text>
  
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.button}>
          <Text style={styles.buttonText}>REGISTRATE</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={[styles.button, styles.loginButton]}> 
          <Text style={styles.buttonText}>INICIA SESIÓN</Text> 
        </TouchableOpacity> 
  
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.link}>
          <Text style={styles.linkText}>Ingresa sin una cuenta</Text>
        </TouchableOpacity>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loginButton: { 
    backgroundColor: '#A7BEFF', // Color para el botón de "INICIA SESIÓN"
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  logo: {
    height: 100, // Ajusta la altura de la imagen 
    width: 'auto', // Ancho se ajusta automáticamente para mantener la proporción
    marginBottom: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFC157',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  link: {
    backgroundColor: '#E0E0FF',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  linkText: {
    color: '#000',
    fontSize: 14,
  },
});

export default WelcomeScreen;