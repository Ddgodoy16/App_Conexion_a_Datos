import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Button} from 'react-native';
import axios from 'axios';
import { styles } from '../Styles';



 
export function PokemonItem({ item }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(item.url);
        setData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [item]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Ocurrió un error al cargar los datos</Text>;
  }

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
      <Text style={styles.texto}>{item.name}</Text>
        <Image source={{ uri: data.sprites.front_default }} style={styles.image} />
        
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: data.sprites.front_default }} style={styles.modalImage} />
          <Text style={styles.modalText}>Nombre: {item.name}</Text>
          <Text style={styles.modalText}>Altura: {data.height}</Text>
          <Text style={styles.modalText}>Peso: {data.weight}</Text>
          <Button title="Cerrar" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}
