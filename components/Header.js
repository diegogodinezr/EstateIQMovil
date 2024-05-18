// components/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>EstateIQ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#6200ea', // Cambiar color
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30, // Ajustar padding
    elevation: 3, // Agregar sombra en Android
    shadowColor: '#000', // Agregar sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  headerText: {
    color: 'white',
    fontSize: 22, // Ajustar tamaño de fuente
    fontWeight: 'bold',
  },
});

export default Header;
