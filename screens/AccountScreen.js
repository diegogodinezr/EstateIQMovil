import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const AccountScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuenta</Text>

      {/* Sección de opciones */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ProfileScreen')}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="person" size={24} color="black" />
          </View>
          <Text style={styles.optionText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('NotificationsScreen')}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="notifications" size={24} color="black" />
          </View>
          <Text style={styles.optionText}>Notificaciones</Text>
        </TouchableOpacity>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 50,
    marginRight: 15, // Espacio entre icono y texto
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    width: '60%',
    backgroundColor: '#FFA0A0',
    padding: 13,
    marginLeft: 75,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;