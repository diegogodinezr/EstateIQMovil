import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
import { getProperties } from '../api/property'; // Importa la función de la API
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Rentar'); // Estado para los botones de "Rentar" y "Comprar"

  const fetchProperties = async () => {
    try {
      const response = await getProperties();
      console.log('Response data:', response.data);
      const updatedProperties = response.data.map(property => {
        if (property.images.length > 0) {
          property.images = property.images.map(image => image.replace('http://localhost', 'http://192.168.1.77'));
        }
        return property;
      });
      setProperties(updatedProperties);
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProperties();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProperties().then(() => setRefreshing(false));
  }, []);

  const renderPropertyItem = ({ item }) => {
    const imageUrl = item.images.length > 0
      ? item.images[0]
      : 'https://via.placeholder.com/200'; // URL de una imagen de reserva

    return (
      <TouchableOpacity style={styles.propertyItem}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.propertyImage}
          onError={(error) => {
            console.log(`Error al cargar la imagen: ${imageUrl}`, error);
          }}
        />
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyTitle}>{item.title}</Text>
          <View style={styles.propertyPriceLocation}>
            <Text style={styles.propertyPrice}>${item.price}</Text>
            <View style={styles.locationContainer}>
              <Icon name="location-outline" size={16} color="#666" />
              <Text style={styles.propertyLocation}>{item.location}</Text>
            </View>
          </View>
          <View style={styles.propertyDetails}>
            <Text style={styles.propertyDetailText}>
              <Icon name="bed-outline" size={16} color="#666" /> {item.bedrooms} Recámaras
            </Text>
            <Text style={styles.propertyDetailText}>
              <Icon name="water-outline" size={16} color="#666" /> {item.bathrooms} Baños
            </Text>
            <Text style={styles.propertyDetailText}>
              <Icon name="resize-outline" size={16} color="#666" /> {item.squaremeters} m²
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Colima, Colima</Text>
        <View style={styles.headerIcons}>
          <Icon name="heart-outline" size={24} color="#000" />
          <Image source={{ uri: 'https://via.placeholder.com/30' }} style={styles.profileImage} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedTab === 'Rentar' ? styles.toggleButtonActive : styles.toggleButtonInactive]}
          onPress={() => setSelectedTab('Rentar')}
        >
          <Text style={selectedTab === 'Rentar' ? styles.toggleButtonTextActive : styles.toggleButtonTextInactive}>Rentar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedTab === 'Comprar' ? styles.toggleButtonActive : styles.toggleButtonInactive]}
          onPress={() => setSelectedTab('Comprar')}
        >
          <Text style={selectedTab === 'Comprar' ? styles.toggleButtonTextActive : styles.toggleButtonTextInactive}>Comprar</Text>
        </TouchableOpacity>
        <Icon name="options-outline" size={24} color="#000" style={styles.filterIcon} />
      </View>
      <View style={styles.searchBar}>
        <Icon name="search-outline" size={20} color="#666" />
        <TextInput placeholder="Buscar" style={styles.searchInput} />
      </View>
      <FlatList
        data={properties}
        renderItem={renderPropertyItem}
        keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
        ListHeaderComponent={
          <>
            <View style={styles.promotionsContainer}>
              <Text style={styles.promotionsText}>Promociones de primavera</Text>
              <Text style={styles.promotionsDescription}>Hasta 10% de descuento en algunas propiedades <Text style={styles.exploreText}>Explorar</Text></Text>
            </View>
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderTitle}>Propiedades populares</Text>
              <Text style={styles.viewAllText}>Ver todo</Text>
            </View>
          </>
        }
        ListFooterComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>Visto recientemente</Text>
            <Text style={styles.viewAllText}>Ver todo</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  toggleButtonActive: {
    backgroundColor: '#ffc107',
  },
  toggleButtonInactive: {
    backgroundColor: '#e0e0e0',
  },
  toggleButtonTextActive: {
    fontWeight: 'bold',
    color: '#000',
  },
  toggleButtonTextInactive: {
    fontWeight: 'bold',
    color: '#888',
  },
  filterIcon: {
    alignSelf: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  promotionsContainer: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  promotionsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  promotionsDescription: {
    fontSize: 14,
    color: '#fff',
  },
  exploreText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  listHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3b5998',
    textDecorationLine: 'underline',
  },
  propertyItem: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  propertyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  propertyInfo: {
    padding: 15,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  propertyPriceLocation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyLocation: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  propertyDetailText: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
