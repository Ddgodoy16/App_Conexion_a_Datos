import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { styles } from './Styles';
import { PokemonItem } from './componentes/PokemonItem';
import { Cargando } from './componentes/Cargando';

export default function App() {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
        setData(respuesta.data.results);
        setError(null);
      } catch (error) {
        console.error(`Error al obtener los datos del servicio`, error);
        setError(error);
      } finally {
        setCargando(false);
      }
    }
    fetchPokemon();
  }, []);

  if (cargando) {
    return (
      <Cargando texto="Cargando..." />
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
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => console.log(item.name)}>
            <PokemonItem item={item} />
          </TouchableOpacity>
        }
        keyExtractor={(item) => item.url}
      />
      <StatusBar style="auto" />
    </View>
  );
}
