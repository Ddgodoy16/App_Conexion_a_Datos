import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Button } from 'react-native';
import axios from 'axios';
import { styles } from '../Styles';

export function PokemonItem({ item }) {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const respuesta = await axios.get(item.url);
        setData(respuesta.data);
        setError(null);
      } catch (error) {
        console.error(`Error al obtener los datos del servicio`, error);
        setError(error);
      } finally {
        setCargando(false);
      }
    }
    fetchPokemonData();
  }, [item]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Ocurrió un error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={{ uri: data.sprites.front_default }} style={styles.image} />
        <Text style={styles.texto}>{item.name}</Text>
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
