// DiscoverScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Switch, Modal, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

const DiscoverScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [filter, setFilter] = useState('Comprar');
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [price, setPrice] = useState('100000');
  const [rooms, setRooms] = useState('1');
  const [bedrooms, setBedrooms] = useState('1');
  const [area, setArea] = useState('0');
  const [currentFilter, setCurrentFilter] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (!location) {
    return <Text>Loading...</Text>;
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setModalVisible(false);
  };

  const handleFilterSelection = (filterType) => {
    setCurrentFilter(filterType);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
    <View style={styles.searchContainer}>
      <MaterialIcons name="search" size={24} color="black" />
      <TextInput style={styles.searchInput} placeholder="Buscar" />
    </View>

    <View style={styles.filtersContainer}>
      <TouchableOpacity
        style={[styles.filterButton, filter === 'Comprar' && styles.selectedFilter]}
        onPress={() => handleFilterSelection('Comprar')}
      >
          <Text style={styles.filterButtonText}>{filter}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilterSelection('Precio')}>
          <Text style={styles.filterButtonText}>Precio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilterSelection('Cuartos')}>
          <Text style={styles.filterButtonText}>Cuartos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilterSelection('Recámaras')}>
          <Text style={styles.filterButtonText}>Recámaras</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleFilterSelection('Metros²')}>
          <Text style={styles.filterButtonText}>Metros²</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            description="This is your current location"
          />
        </MapView>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Notifícame de nuevas oportunidades</Text>
        <Switch
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Selecciona una opción</Text>
            {currentFilter === 'Comprar' && (
              <>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleFilterChange('Comprar')}
                >
                  <Text style={styles.textStyle}>Comprar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleFilterChange('Rentar')}
                >
                  <Text style={styles.textStyle}>Rentar</Text>
                </TouchableOpacity>
              </>
            )}
            {currentFilter === 'Precio' && (
              <Picker
                selectedValue={price}
                style={styles.picker}
                onValueChange={(itemValue) => setPrice(itemValue)}
              >
                <Picker.Item label="200,000" value="200000" />
                <Picker.Item label="500,000" value="500000" />
                <Picker.Item label="700,000" value="700000" />
                <Picker.Item label="900,000" value="900000" />
                <Picker.Item label="1,000,000" value="1000000" />
                <Picker.Item label="1,500,000" value="1500000" />
                <Picker.Item label="2,000,000" value="2000000" />
              </Picker>
            )}
            {currentFilter === 'Cuartos' && (
              <Picker
                selectedValue={rooms}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setRooms(itemValue)}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            )}
            {currentFilter === 'Recámaras' && (
              <Picker
                selectedValue={bedrooms}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setBedrooms(itemValue)}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            )}
            {currentFilter === 'Metros²' && (
              <Picker
                selectedValue={area}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => setArea(itemValue)}
              >
                <Picker.Item label="0" value="0" />
                <Picker.Item label="50" value="50" />
                <Picker.Item label="100" value="100" />
                <Picker.Item label="150" value="150" />
                <Picker.Item label="200" value="200" />
                <Picker.Item label="250" value="250" />
              </Picker>
            )}
            <TouchableOpacity
              style={[styles.modalButton, styles.closeButton]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginVertical: 10, // Ajusta el margen vertical según tus necesidades
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  selectedFilter: {
    backgroundColor: '#FFC157',
  },
  filterButtonText: {
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1, // Esto hará que el mapa ocupe todo el espacio restante
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  notificationText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
    backgroundColor: '#FFC157',
    width: '80%',
  },
  closeButton: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 20,
  },
});

export default DiscoverScreen;
