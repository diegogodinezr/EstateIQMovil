import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
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
  const [rentMode, setRentMode] = useState(true); // Estado para el modo Rentar
  const [sellMode, setSellMode] = useState(false); // Estado para el modo Vender

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

  const handleRentToggle = () => {
    setRentMode(true);
    setSellMode(false);
  };

  const handleSellToggle = () => {
    setSellMode(true);
    setRentMode(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Publicar una propiedad</Text>

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

      {/* Seccion para recamaras, baños y m2 */}
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
      {/* Botones */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  container: {
    marginTop: 80,
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    marginBottom: 1, // Añade espacio entre el título y los botones
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
    marginLeft: 75,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row', // Cambia la dirección a columna
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#D3D3D3', // Color del botón inactivo
    margin: 10, // Aumenta el margen
    padding: 7, // Aumenta el padding
    marginLeft: 40, // Espacio entre botones
    borderRadius: 10,
    width: '30%', // Ajusta el ancho
    alignItems: 'center',
    marginBottom: 5, // Espacio entre botones
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