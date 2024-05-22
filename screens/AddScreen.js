import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
      // Añadir imagen solo si no está cancelado
      setImages([...images, { uri: pickerResult.uri }]);
    }
  };

  const handleSubmit = () => {
    // Aquí se envía la información de la propiedad al backend (opcional)
    console.log('Formulario enviado:', {
      title,
      price,
      location,
      bedrooms,
      bathrooms,
      squareMeters,
      details,
      images,
    });
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

      {/* Botones Rentar/Vender */}
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

      {/* Sección de fotos */}
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

      {/* Formulario */}
      <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric" // Solo permite números
      />
      <TextInput style={styles.input} placeholder="Ubicación" value={location} onChangeText={setLocation} />

      {/* Sección para recámaras, baños y m² */}
      <View style={styles.detailsContainer}>
        <TextInput
          style={styles.detailsInput}
          placeholder="Recámaras"
          value={bedrooms}
          onChangeText={setBedrooms}
          keyboardType="numeric" // Solo permite números
        />
        <TextInput
          style={styles.detailsInput}
          placeholder="Baños"
          value={bathrooms}
          onChangeText={setBathrooms}
          keyboardType="numeric" // Solo permite números
        />
        <TextInput
          style={styles.detailsInput}
          placeholder="m²"
          value={squareMeters}
          onChangeText={setSquareMeters}
          keyboardType="numeric" // Solo permite números
        />
      </View>

      {/* Campo de detalles */}
      <TextInput style={styles.input} placeholder="Detalles" value={details} onChangeText={setDetails} />

      {/* Botón de publicar */}
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
    paddingBottom: 40, // Añade espacio en la parte inferior para asegurar que el contenido sea visible
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginTop: 40, // Añade espacio en la parte superior
    marginBottom: 20, // Añade espacio entre el título y los botones
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
    flexDirection: 'row', // Cambia la dirección a fila
    justifyContent: 'center',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#D3D3D3', // Color del botón inactivo
    margin: 10, // Aumenta el margen
    padding: 10, // Aumenta el padding
    borderRadius: 10,
    width: '30%', // Ajusta el ancho
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FFC157', // Color del botón activo
  },
  inactiveButton: {
    backgroundColor: '#D3D3D3', // Color del botón inactivo
  },
  actionButtonText: {
    color: 'black',
    fontSize: 16, // Aumenta el tamaño del texto
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

export default AddScreen;
