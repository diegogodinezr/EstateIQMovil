import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [messageNotificationsEnabled, setMessageNotificationsEnabled] = useState(true);
  const [publicationNotificationsEnabled, setPublicationNotificationsEnabled] = useState(true);

  useEffect(() => {
    // Load the initial state from AsyncStorage when the component mounts
    const loadNotificationSettings = async () => {
      try {
        const messageNotifications = await AsyncStorage.getItem('messageNotificationsEnabled');
        const publicationNotifications = await AsyncStorage.getItem('publicationNotificationsEnabled');
        
        if (messageNotifications !== null) {
          setMessageNotificationsEnabled(JSON.parse(messageNotifications));
        }
        if (publicationNotifications !== null) {
          setPublicationNotificationsEnabled(JSON.parse(publicationNotifications));
        }
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    };

    loadNotificationSettings();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleMessageNotifications = async () => {
    const newValue = !messageNotificationsEnabled;
    setMessageNotificationsEnabled(newValue);
    try {
      await AsyncStorage.setItem('messageNotificationsEnabled', JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving message notification setting:', error);
    }
  };

  const togglePublicationNotifications = async () => {
    const newValue = !publicationNotificationsEnabled;
    setPublicationNotificationsEnabled(newValue);
    try {
      await AsyncStorage.setItem('publicationNotificationsEnabled', JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving publication notification setting:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Notificaciones</Text>
        <View style={styles.emptySpace} />
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.notificationTitle}>Notificaciones de mensajes</Text>
        <Switch
          value={messageNotificationsEnabled}
          onValueChange={toggleMessageNotifications}
          trackColor={{ false: '#D3D3D3', true: '#FFC157' }}
          thumbColor={messageNotificationsEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.notificationTitle}>Notificaciones de publicaciones</Text>
        <Switch
          value={publicationNotificationsEnabled}
          onValueChange={togglePublicationNotifications}
          trackColor={{ false: '#D3D3D3', true: '#FFC157' }}
          thumbColor={publicationNotificationsEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginTop: 40,
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
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
