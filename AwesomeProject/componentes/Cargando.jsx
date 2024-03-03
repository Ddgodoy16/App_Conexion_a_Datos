import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from '../Styles';

export function Cargando({ texto }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>{texto}</Text>
    </View>
  );
}