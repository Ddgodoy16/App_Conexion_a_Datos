import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    fontSize: 25,
    fontWeight: 'bold',
    
  },

  image: {
    width: 100, 
    height: 100, 
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalImage: {
    width: 200,
    height: 200,
  },
  modalText: {
    fontSize: 25,
    marginBottom: 10,
  },

});
