import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { styles } from './Styles';
import { PokemonItem } from './componentes/PokemonItem';
import { Cargando } from './componentes/Cargando';

export default function App() {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
    };
    fetchPokemon();
  }, []);

  const handleSearch = () => {
    return data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const renderPokemonItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10 }} onPress={() => console.log(item.name)}>
      <PokemonItem item={item} />
    </TouchableOpacity>
  );

  if (cargando) {
    return <Cargando texto="Cargando..." />;
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
     <TextInput
  style={[styles.searchInput, { fontSize: 30,}]}
  placeholder="Buscar Pokémon..."
  onChangeText={setSearchTerm}
  value={searchTerm}
/>
      <FlatList
        data={searchTerm ? handleSearch() : data} 
         renderItem={renderPokemonItem}
        keyExtractor={(item) => item.url}
      />
      <StatusBar style="auto" />
    </View>
  );
}

