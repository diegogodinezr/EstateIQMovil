import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { addPropertyRequest } from '../api/property'; // Importa la función de la API

const AddScreen = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [squareMeters, setSquareMeters] = useState('');
  const [details, setDetails] = useState('');
  const [rentMode, setRentMode] = useState(true); // Estado para el modo Rentar
  const [sellMode, setSellMode] = useState(false); // Estado para el modo Vender

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
      setImages([...images, { uri: pickerResult.uri }]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('location', location);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('squaremeters', squareMeters);
    formData.append('description', details);

    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        type: 'image/jpeg',
        name: `image${index}.jpg`,
      });
    });

    try {
      const response = await addPropertyRequest(formData);
      if (response.status === 200 || response.status === 201) {
        alert('¡Propiedad agregada con éxito!');
        setTitle('');
        setPrice('');
        setLocation('');
        setBedrooms('');
        setBathrooms('');
        setSquareMeters('');
        setDetails('');
        setImages([]);
      } else {
        alert('Hubo un error al agregar la propiedad');
      }
    } catch (error) {
      console.error('Error al agregar propiedad:', error);
      alert('Hubo un error al agregar la propiedad');
    }
  };

  const handleRentToggle = () => {
    setRentMode(true);
    setSellMode(false);
  };

  const handleSellToggle = () => {
    setSellMode(true);
    setRentMode(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Publicar una propiedad</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, rentMode ? styles.activeButton : styles.inactiveButton]}
          onPress={handleRentToggle}
        >
          <Text style={styles.actionButtonText}>Rentar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, sellMode ? styles.activeButton : styles.inactiveButton]}
          onPress={handleSellToggle}
        >
          <Text style={styles.actionButtonText}>Vender</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {images.length > 0 &&
          images.map((image, index) => (
            <Image key={index} source={{ uri: image.uri }} style={styles.image} />
          ))}
        <TouchableOpacity onPress={handleChooseImage} style={styles.addPhotoButton}>
          <MaterialIcons name="add-a-photo" size={30} color="black" />
          <Text style={styles.addPhotoText}>Añadir fotos</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput style={styles.input} placeholder="Ubicación" value={location} onChangeText={setLocation} />

      <View style={styles.detailsContainer}>
        <TextInput
          style={styles.detailsInput}
          placeholder="Recámaras"
          value={bedrooms}
          onChangeText={setBedrooms}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.detailsInput}
          placeholder="Baños"
          value={bathrooms}
          onChangeText={setBathrooms}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.detailsInput}
          placeholder="m²"
          value={squareMeters}
          onChangeText={setSquareMeters}
          keyboardType="numeric"
        />
      </View>

      <TextInput style={styles.input} placeholder="Detalles" value={details} onChangeText={setDetails} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  addPhotoButton: {
    backgroundColor: '#f5f5f5',
    padding: 30,
    width: '60%',
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
  addPhotoText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 13,
    fontWeight: 'bold',
    marginBottom: 20,
    borderRadius: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailsInput: {
    backgroundColor: '#fff',
    padding: 13,
    fontWeight: 'bold',
    flex: 1,
    margin: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FFC157',
    padding: 15,
    width: '60%',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#D3D3D3',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FFC157',
  },
  inactiveButton: {
    backgroundColor: '#D3D3D3',
  },
  actionButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

export default AddScreen;
