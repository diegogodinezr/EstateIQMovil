import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
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

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImages([...images, { uri: response.uri }]);
      }
    });
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publicar una propiedad</Text>

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
      <TextInput style={styles.input} placeholder="Precio por mes" value={price} onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Ubicación" value={location} onChangeText={setLocation} />

      {/* Seccion para recamaras, baños y m2 */}
      <View style={styles.detailsContainer}>
        <TextInput style={styles.detailsInput} placeholder="Recámaras" value={bedrooms} onChangeText={setBedrooms} />
        <TextInput style={styles.detailsInput} placeholder="Baños" value={bathrooms} onChangeText={setBathrooms} />
        <TextInput style={styles.detailsInput} placeholder="m²" value={squareMeters} onChangeText={setSquareMeters} />
      </View>

      {/* Campo de detalles */}
      <TextInput style={styles.input} placeholder="Detalles" value={details} onChangeText={setDetails} />

      {/* Botones */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    padding: 15,
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
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailsInput: {
    backgroundColor: '#fff',
    padding: 10,
    flex: 1,
    margin: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FFC157',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddScreen;